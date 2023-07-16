# Next.js 13에서 react-query 사용하기

Next.js 13의 클라이언트 컴포넌트에서 `react-query`를 사용하는 경우, 서버 컴포넌트에서 데이터를 미리 가져온 뒤 클라이언트 컴포넌트에 전달하는 것

## 서버 컴포넌트에서 pre-fetch한 뒤 클라이언트 컴포넌트에 전달하는 방법 2가지

1. props drilling 방식으로 pre-fetch
2. hydrate 방식으로 pre-fetch

### hydrate 방식으로 pre-fetch

SSR내에서 pre-fetch를 통해 쿼리를 불러온 뒤, queryClient에서 dehydrate한 상태값으로 페이지에 전달

Hydration을 통한 방법은 SSR 방식의 개발시 원하는 쿼리를 pre-fetch하고 해당 쿼리를 사용하는 컴포넌트에서는 동일한 키로 useQuery만 호출하면 된다.

## 초기 설정

### 1. Provider에 queryClient 설정

Next.js는 페이지를 이동하게 되면 새롭게 렌더링 되는 방식이기 때문에, `useState`를 이용해 단 한번만 선언되게 만들어 주는 것이다.

이렇게 해주지 않으면 페이지 이동 시마다 새로운 `queryClient`가 생성되고 전파되기 때문에 기존 데이터가 캐싱되지 않고 유실되는 상황이 발생한다.

📜 /app/Provider.tsx

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function Provider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
```

### 2. layout.tsx에서 Provider 감싸주기

📜 /app/layout.tsx

```tsx
//...
return (
  <html lang='en'>
    <body className='relative min-h-screen'>
      <Provider>{children}</Provider>
      <Footer />
    </body>
  </html>
)
```

### 3. Hydrate 요소 만들기

📜 /lib/tanstackQuery/HydrateOnClient.tsx

react-query의 `Hydration` 요소를 클라이언트 컴포넌트로 래핑해서 클라이언트 컴포넌트에서 사용할 수 있도록 만들어 준다.

추후에 `'use client'` 지시문이 react-query에 추가된다면 이 파일은 필요없게 될 것이다.

```tsx
'use client'

import { Hydrate as HydrateOnClient } from '@tanstack/react-query'
export default HydrateOnClient
```

### 4. queryKey와 queryFn을 받아 pre-fetch를 담당하는 컴포넌트 생성

react-query의 SSR(pre-fetch)는 query cache와 dehydrate 원리로 동작한다.

데이터를 pre-fetch하고 해당 cache를 `dehydrate`해서 클라이언트에 그것을 `rehydrate` 하는 것이다.

해당 쿼리를 사용하는 클라이언트 컴포넌트에서는 동일한 키로 `useQuery`만 호출하면 된다.

서버를 통해 pre-fetch를 해서 `dehydrate`한 queryKey를 가진 useQuery는 SSR이 적용되고, 그렇지 않은 queryKey를 가진 useQuery는 CSR 방식으로 처리된다.

📜 /lib/tanstack/PrefetchHydration.tsx

```tsx
import {
  QueryClient,
  QueryFunction,
  QueryKey,
  dehydrate,
} from '@tanstack/react-query'
import { FC, PropsWithChildren, cache } from 'react'

import HydrateOnClient from './hydrateOnClient'

interface Props {
  queryKey: QueryKey
  queryFn: QueryFunction
}

const PrefetchHydration: FC<PropsWithChildren<Props>> = async ({
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

export default PrefetchHydration
```

## 참고 문서

- [Next.js 13 버전에서 ReactQuery 사용시 서버 컴포넌트에서 클라이언트 컴포넌트로 pre-fetch 데이터 전달하는 방법](https://11001.tistory.com/221)
- [React Query - Hydration(SSR)](https://velog.io/@pjh1011409/React-Query-HydrationSSR)
- [Next.js 13에서 React Query SSR 적용하는 방법](https://velog.io/@ckstn0777/Next.js-13%EC%97%90%EC%84%9C-React-Query-SSR-%EC%A0%81%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
