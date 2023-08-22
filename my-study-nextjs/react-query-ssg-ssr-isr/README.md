# NextJS에서 React-Query with SSR, SSG, ISR 이해하기

## ✊ React Query config

### 0. install

```bash
$ yarn add @tanstack/react-query
```

### 1. QueryClient Provider

```
⭐️ react-query를 사용하기 위해 QueryClientProvider를 최상단에 감싸주자
```

**📜 app/providers.tsx**

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default Providers
```

이제 layout에서 감싸주자

**📜 app/layout.tsx**

```tsx
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    ...
        <Providers>{children}</Providers>
    ...
  )
}
```

## 🤔 react-query는 서버의 상태를 관리하는 ..?

```
🥺 서버라는 말로는 SSR을 해야할 거 같고, 상태라는 말로는 CSR을 해야할 거 같고 ?
```

```
react-query의 pre-fetch는 query cache와 dehydrate 원리로 동작한다.

데이터를 pre-fetch하고 해당 cache를 dehydrate해서 클라이언트에 그것을 rehydrate 하는 것이다.

해당 쿼리를 사용하는 클라이언트 컴포넌트에서는 동일한 키로 useQuery만 호출하면 된다.

서버를 통해 pre-fetch를 해서 dehydrate한 queryKey를 가진 useQuery는 pre-fetch가 적용되고, 그렇지 않은 queryKey를 가진 useQuery는 CSR 방식으로 처리된다.
```

```
⭐️ 서버 컴포넌트에서 cache하고, 클라이언트 컴포넌트에서 같은 쿼리키로 호출해서 사용
```

### 필요한 역할1. rehydrate 역할

```
⭐️ 클라이언트 컴포넌트를 감싸주어 rehydrate를 담당하게 될 컴포넌트이다.
```

아래와 같이 굳이 선언을 해서 한번더 export하는 이유는 'use client'가 필요하기 때문이다.
즉, 클라이언트 컴포넌트 경계에서 사용될 컴포넌트이기 때문이다.

**📜 lib/tanstack/HydrateOnClient.tsx**

```tsx
'use client'

import { Hydrate as HydrateOnClient } from '@tanstack/react-query'
export default HydrateOnClient
```

#### react-query의 hydrate를 사용하는 이유

그러면 그냥 client side에서 fetch하면 되는거 아닌가? 맞다.

하지만 나머지 부분이 server component로 구현하고 무한 스크롤 부분만 client component에서 렌더링을 하게된다면 나머지는 모두 고정되어있지만 혼자 매우 깜빡이며 매우 늦게 불러오는것 처럼 보이게 된다.

사실은 다른 요소들이 너무 빠른것 뿐인데 말이다.

그래서 client side에서 fetch를 하는데 첫 데이터에 대해서 이미 그려진 html처럼 보여지게 하기위해서 (ssr) react-query에서는 prefetch와 hydrate라는것을 제공해 주었다.

### 필요한 역할2. dehydrate 해서 rehydrate한테 넘겨주는 역할

```
⭐️
   1. props로 queryKey와 queryFn을 받아 pre-fetch
   2. dehydrate하게 만든 state 생성
   3. 2번 state를 rehydrate하는 컴포넌트에게 전달

   → dehydrate로 queryKey와 queryFn을 넘겨 pre-fetch 시키고
     클라이언트 컴포넌트에서는 동일한 queryKey를 가지고 useQuery를 사용하면 pre-fetch된 데이터를 이용할 수 있다.
```

**📜 lib/tanstack/PrefetchHydration.tsx**

```tsx
import type { QueryFunction, QueryKey } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'
import { cache } from 'react'

import HydrateOnClient from './HydrateOnClient'

interface Props {
  queryKey: QueryKey
  queryFn: QueryFunction
}

export const PrefetchHydration: FC<PropsWithChildren<Props>> = async ({
  queryKey,
  queryFn,
  children,
}) => {
  const getQueryClient = cache(() => new QueryClient())
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(queryKey, queryFn)
  const dehydratedState = dehydrate(queryClient)

  return <HydrateOnClient state={dehydratedState}>{children}</HydrateOnClient>
}
```

## react의 cache 함수?

13버전 부터는 fetch 함수에 cache 옵션을 통해 SSG나 SSR, ISR을 구현할 수 있다고 한다. [Next.js 공식문서에는 third-party 라이브러리](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries) 가령 가장 대표적으로 `axios`를 사용할 경우 SSG, SSR, ISR을 구현할 수 있는 방법들을 제시해 주고 있다.

```tsx
import { cache } from 'react'

export const revalidate = 3600 // revalidate the data at most every hour

export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

여기에서도 cache 함수가 나오고 있으며, 위에서 dehydration을 위한 컴포넌트 내부에도 cache 함수가 존재했다.

```
🤔 cache 함수에 대해 궁금하다.
```

### [코드](https://github.com/facebook/react/blob/main/packages/react/src/ReactCache.js#L55)를 뜯어보자

```js
export function cache<A: Iterable<mixed>, T>(fn: (...A) => T): (...A) => T {
  return function () {
    const dispatcher = ReactCurrentCache.current
    if (!dispatcher) {
      // If there is no dispatcher, then we treat this as not being cached.
      // $FlowFixMe[incompatible-call]: We don't want to use rest arguments since we transpile the code.
      return fn.apply(null, arguments)
    }
    const fnMap: WeakMap<any, CacheNode<T>> = dispatcher.getCacheForType(
      createCacheRoot
    )
    const fnNode = fnMap.get(fn)
    let cacheNode: CacheNode<T>
    if (fnNode === undefined) {
      cacheNode = createCacheNode()
      fnMap.set(fn, cacheNode)
    } else {
      cacheNode = fnNode
    }
    for (let i = 0, l = arguments.length; i < l; i++) {
      const arg = arguments[i]
      if (
        typeof arg === 'function' ||
        (typeof arg === 'object' && arg !== null)
      ) {
        // Objects go into a WeakMap
        let objectCache = cacheNode.o
        if (objectCache === null) {
          cacheNode.o = objectCache = new WeakMap()
        }
        const objectNode = objectCache.get(arg)
        if (objectNode === undefined) {
          cacheNode = createCacheNode()
          objectCache.set(arg, cacheNode)
        } else {
          cacheNode = objectNode
        }
      } else {
        // Primitives go into a regular Map
        let primitiveCache = cacheNode.p
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = new Map()
        }
        const primitiveNode = primitiveCache.get(arg)
        if (primitiveNode === undefined) {
          cacheNode = createCacheNode()
          primitiveCache.set(arg, cacheNode)
        } else {
          cacheNode = primitiveNode
        }
      }
    }
    if (cacheNode.s === TERMINATED) {
      return cacheNode.v
    }
    if (cacheNode.s === ERRORED) {
      throw cacheNode.v
    }
    try {
      // $FlowFixMe[incompatible-call]: We don't want to use rest arguments since we transpile the code.
      const result = fn.apply(null, arguments)
      const terminatedNode: TerminatedCacheNode<T> = (cacheNode: any)
      terminatedNode.s = TERMINATED
      terminatedNode.v = result
      return result
    } catch (error) {
      // We store the first error that's thrown and rethrow it.
      const erroredNode: ErroredCacheNode<T> = (cacheNode: any)
      erroredNode.s = ERRORED
      erroredNode.v = error
      throw error
    }
  }
}
```

```
⭐️ 어렵지만,... 결론적으로는 caching 기능을 적용한 새로운 함수를 반환
```

### Dehydration 하던 컴포넌트를 다시 살펴보자

```tsx
const getQueryClient = cache(() => new QueryClient())
```

이 부분의 코드에서는 cache 함수를 사용하여 QueryClient 생성과 관련된 다중 인스턴스 생성 문제를 방지하는 역할을 한다.

따라서, cache는 불필요한 인스턴스 생성을 최소화하며, 성능 최적화를 가능하게 한다. 또한, SSR을 구현할 때 QueryClient 인스턴스를 재사용함으로써 서버 및 클라이언트 간 데이터 정합성 및 초기 로딩 시점의 렌더링 성능을 향상시킬 수 있다.

### React Query로 SSR, SSG, ISR 구현하기

```
⭐️
```

# 참고

- [ReactQuery + ISR 적용기](https://medium.com/uplusdevu/next-js-reactquery-isr-%EC%A0%81%EC%9A%A9%EA%B8%B0-2c7b5b73fe24)
- [블로그 게시글 페이지 SSR → SSG 전환기](https://byjuun.com/post/143)
