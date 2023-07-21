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

# 기본 개념 정리

## 🤔 React Query란?

React Query는 React 애플리케이션에서 데이터 관리와 상태 관리를 용이하게 해주는 JavaScript 라이브러리

주로 API 호출, 데이터 캐싱, 상태 갱신 등을 처리하기 위해 사용된다.

React Query는 데이터 관리를 효율적으로 처리할 수 있도록 도와준다.

## React Query를 사용함으로써 얻을 수 있는 이점

### 1. useEffect와 state를 활용한 상태 관리 로직 단축

useEffect with useState

```js
const FC = () => {
  const [state, setState] = useState(null)

  useEffect(() => {
    fetch('url').then((res) => setState(res))
  }, [])

  return <div>:)</div>
}
```

only react-query

```js
const FC = () => {
  const { data } = useQuery([queryKey], queryFn, option)

  return <div>:)</div>
}
```

### 2. 서버 사이드 데이터의 전역 상태 관리

react-query에서 호출한 데이터는 자동으로 캐싱되기 때문에 어디에서든 사용할 수 있다. 단, 이를 위해선 **staleTime(신선하지 않은 시간)을 설정해주어야** 할 필요가 있다.

#### 📌 **staleTime**

- staleTime은 react-query가 호출한 데이터의 신선 상태(유효 기간)을 의미
- 이 시간이 지나지 않으면 react-query로 요청한 서버 데이터는 캐싱되어 있으며 이 기간이 유효할 때까지 백엔드에서 데이터를 다시 가져오지 않고 캐싱된 데이터를 사용
- staleTime은 default value는 0

#### 🤔 cacheTime과 staleTime에 대해

cacheTime도 캐싱 관련 설정 중 하나. staleTime과 cacheTime은 유사하면서도 완벽히 같지는 않은 설정

cacheTime은 말 그대로 저장이 되는 시간이다. staleTime은 데이터의 신선 여부를 판단해 특정 시간이 지나면 신선하지 않은 상태로 만들어 캐싱 데이터를 무시하고 데이터 패칭을 다시 하는데 사용한다.

반면 cacheTime은 데이터를 특정 시간 만큼 저장하고 있어 staleTime과 무관하게 불필요한 데이터 요청을 줄이기 위해 사용한다.

즉, **staleTime**은 <U>특정 시간 뒤 새로운 데이터가 필요할 때</U> 설정하는 옵션이라면 **cacheTime**은 <U>특정 시간이 지날 때까지 데이터를 캐싱</U>하여 해당 시간이 지날 때까지 불필요한 데이터 요청없이 캐싱된 데이터를 재사용하기 위해 설정하는 것이다.

staleTime과 cacheTime은 둘 중 하나라도 0이 된다면 매번 새로운 데이터를 호출할 것이다.

그러나 만약 staleTime이 존재하고 cacheTime이 존재한다고 가정한다면 즉, 캐싱하겠다고 한 시간은 남았지만 신선하지 않은 상태가 되었다면, 마운트되었을 때 신선하지 않다고 판한다여 **데이터 패칭을 시도**한다.

→ ⭐️ cacheTime이 남았더라도, staleTime이 끝났다면 마운트 시 새로운 데이터 가져오기

⭐️ 재밌는 점은, cacheTime이 남아있다면 데이터를 패칭하는 동안에 빈화면이 아닌 이미 캐싱된 데이터를 보여주게 된다.

예를 든다면, staleTime이 4분, cacheTime이 1분이라면 cacheTime이 먼저 끝나고 staleTime이 지나 데이터를 새로 가지고 와야 할 때 **데이터는 캐싱되어 있지 않아** 비어있는 화면을 렌더하면서 데이터를 새로 가지고 온다.

반면 cacheTime이 5분이라면 staleTime이 자났음에도 데이터는 캐싱되어 있기 때문에 신선하지 않은 상태라 판단하여 **캐싱된 데이터를 보여주면서 데이터 패칭**을 할 수가 있다.

따라서 staleTime이 0이고 cacheTime은 5분이 defaultValue로 설정되어 있으며 경우에 따라 이 두 옵션을 다르게 사용할 수 있지만 패칭 중일 때 **캐시 데이터를 보여주고 데이터는 항상 정확하고 일치해야 한다는 무결성을 위해** <U>cacheTime을 staleTime 보다 더 길게</U> 두고 사용하는 편

→ ⭐️ cacheTime > staleTime

### 3. 데이터의 캐싱과 손쉬운 데이터 리패칭

한번 캐싱된 데이터는 마운트 언마운트와 상관없이 캐싱되며 이는 브라우저의 메모리에 저장되는데, 페이지를 끄거나 새로고침하면 메모리가 초기화되어 캐싱된 데이터도 사라지게 된다. 즉, 페이지를 껐다 키거나, 새로고침을 하지 않는다면 데이터는 페이지와 페이지 이동간에도 캐싱되어 사용할 수 있다는 이야기

## 🤔 useQuery, useMutation

react-query의 데이터 패칭 방법에는 `useQuery`와 `useMutation`이 존재

### useQuery

- **데이터 조회에 사용되는 훅**
- 주어진 쿼리 키에 대해 비동기 함수를 실행하여 데이터를 패칭
- 가져온 데이터는 캐싱되며, 이후 해당 쿼리 키에 대한 재요청 시에는 쿼리 키와 매핑되어 있는 캐싱된 데이터를 반환하고 동시에 백그라운드에서 실제 서버 요청을 보내 새로운 데이터를 가져올 수 있다.
- 쿼리 결과와 함께 로딩 상태, 에러 처리, 캐싱 제어 등의 기능을 제공

```js
const { data, isLoading, status, error } = useQuery([queryKey], queryFn, option)
```

### useMutation

- **데이터 변경(post, update, delete)에 사용되는 훅**
- 비동기 함수를 실행하여 데이터를 변경하고, 변경되 데이터를 서버에 반영
- 주어진 비동기 함수를 실행하고 성공 또는 실패 시에 콜백을 제공하여 후속 작업 수행 가능(onSuccess, onError)

📌 **mutate와 asyncMutate**

`mutate`는 동기적으로 데이터를 변경하는 데 사용된다. 따라서 해당 요청이 성공/실패 시 다음 동작을 `onSuccess`와 `onError`에 작성해주면 된다.

반면 `asyncMutate`는 비동기적으로 데이터를 변경하는 데 사용된다. `mutate`의 결과를 포함하는 `Promise`를 반환한다. 따라서 `try-catch` 안에서 `async-await`를 포함하여 성공/실패 시 로직을 작성해주어야 한다.

## 🤔 Invalidate Query

react-query에서는 서버에서 받아온 데이터를 캐싱하여 손쉽고 효율적으로 상태를 관리하기 위해 사용하는 라이브러리이다. 상태 관리를 조절하기 위해 staleTime을 조정하거나 cacheTime을 조정하게 된다.

🤔 staleTime으로 설정해둔 시간 전에 데이터를 재호출할 수는 없을까?

할 수 있다. react-query의 장점은 손쉬운 데이터 캐싱과 이를 재호출할 수 있는 refetching 로직이다. 간단하게 말해, 현재 데이터가 가장 최신의(신선한) 데이터라고 할 지라도 개발자가 원하는 시기에 이를 언제든지 갱신 가능.

### 원할 때 데이터를 갱신하는 방법

#### 1. refetch

`retch`는 react-query의 useQuery를 사용하여 데이터를 리패칭하는 메서드이다. 가장 큰 특징은 **캐시 데이터를 무시한다는 점**이다. 즉, 이미 캐싱된 데이터가 존재하더라도 아예 새로운 데이터를 받아오는 것. 주로 사용자의 행동에 따라 데이터를 갱신해야 하는 일이 있다면 사용(ex. 사용자가 옵션을 선택하고 조회 버튼을 눌렀을 때 패칭해야 하는 경우)

```js
const {data, fetch} = useQuery([queryKey], queryFn, option)

const onPressRefreshBtn = () -> {
  refetch()
}

return (
  <button onClick={onPressRefreshBtn}>재요청!</button>
)
```

#### 2. invalidate

`invalidate`는 **캐싱된 데이터를 무효화**하여 다음에 이 요청을 만나면 캐싱 되어 있지 않으니까 데이터를 가져오라는 형태로 사용하게 된다.

`refetch`와 가장 큰 차이점은 `invalidate`는 캐시를 유지하고 이를 갱신하기 위해 사용하며 `invalidate`는 데이터를 새로 받아오는 역할을 수행하는 게 아닌 다음 번 페이지가 마운트 되었을 때 쿼리를 실행하면 재요청해라 라는 뜻

즉, `invalidate`는 캐시를 무효화하여 새로운 데이터를 요청할 **준비**를 시키고, `refetch`는 실제로 쿼리를 다시 실행하여 데이터를 업데이트하는 역할

```js
const queryClient = useQueryClient()

const handleDataUpdate = () => {
  // 'myData' 쿼리의 캐시를 무효화
  queryClient.invalidateQueries('myData')
}
```

#### 결론

만약 내가 데이터를 추가했을 때 지금 당장 데이터를 갱신해야 한다면 `refetch`!

새로운 데이터가 당장 필요한 게 아니라면 `invalidate`!

## 🤔 Query refetching, status, isLoading, error

```js
const { data, isFetching, isLoading, isError, status, error } = useQuery(
  [queryKey],
  queryFn,
  option
)
```

- data: 통신이 성공했을 때 실제 데이터가 들어가 있는 프로퍼티
- isFetching: 데이터가 캐싱되어 있는 상태에서 다시 갱신이 이루어졌는지 여부
- isLoading: 데이터를 불러오고 있는 상태 자체를 성공 여부와 상관없이 boolean을 반환.
- isError: 실패했을 때의 결과값을 boolean값으로 반환
- status: loading | success | error 데이터 실행 중과 성공 실패에 대한 결과를 문자열로 반환
- error: error가 발생했을 때 error 객체를 반환하여 error를 변수로 사용 가능

## 🤔 Another Option

아래는 다양한 옵션 중 react-query에서 자주 쓰일 수 있는 몇 가지 옵션을 정리해보았다.

1. enabled

   이 옵션은 쿼리를 활성화 또는 비활성화할지를 결정. 기본적으로 모든 쿼리는 활성화되어 있지만 false로 설정하여 특정 조건에서만 쿼리를 실행할 수 있도록 여부를 결정할 수 있다. 보통 props가 준비되었을 때 쿼리를 실행할 수 있도록 잠시 멈춰두는 용도로 사용

2. suspense

   데이터가 불러오질 때까지 컴포넌트를 렌더하지 않고 대기 상태로 만든다. 데이터가 불러와질 때까지 컴포넌트 혹은 빈 화면 대신 `fallback` 컴포넌트를 보여줌으로써 사용자에게 로딩 상태를 시각적으로 보여줄 수 있다.

3. retry

   데이터 요청에 실패했을 때 재요청을 시도할 수 있으며 `interval` 옵션을 통해 특정 주기마다 재요청을 반복할 수도 있다.

4. refetchOnWindowFocus

   이 옵션은 창이 다시 포커스될 때 자동으로 쿼리를 다시 가져올지 여부를 설정한다. 이를 통해 백그라운드에서 포그라운드로 전활할 때 데이터를 즉시 업데이트할 수 있다. `staleTime`과 역할이 비슷할 수는 있지만 결국 windowFocus는 데이터 캐싱과는 연관이 없으며 사용자의 이벤트에 의존한다는 차이점이 있다.

## 🤔 Optimistic Update

낙관적 업데이트의 핵심은 백엔드 데이터와 화면에 동기화하는 것을 신경쓰지 않고 먼저 사용자에게 데이터를 보여준 후, 결과나 실패에 따라 UI를 업데이트할 수 있도록 한다.

즉, 사용자는 백엔드와의 통신 여부와 상관없이 UI 여부를 확인할 수 있다. 대표적으로 인스타그램의 좋아요나 채팅과 같이 사용자에게 빠른 데이터를 보내주어야만 할 때 사용한다.

쉽게 말해 좋아요를 누르면 원래는 바로 하트가 채워지는 걸 사용자는 바로 눈으로 확인하지만, 내부적으로는 다음과 같은 과정 후에 하트가 채워져야 한다.

1. 좋아요 누르면 요청 보내기
2. 요청에 대한 응답 받기
3. 응답 결과에 따라 UI 반영하기

위 과정에 나와있는 백엔드 통신 과정을 신경쓰지 않고 바로 일단 하트를 채우는 것이다. 덕분에 사용자는 빠르게 확인이 가능할 것이다.

아래는 react의 hook을 사용했을 때의 낙관적 업데이트의 예싱

```js
const [isLike, setIsLike] = useState()

const onPressLikeBtn = async () => {
  setIsLike(true)
  // 낙관적으로 상태를 먼저 업데이트
}

try {
  fetch('url')
  setIsLike(true)
} catch (err) {
  if (err) {
    setIsLike(false)
  }
}
// 백엔드 통신에 따라 데이터 업데이트
// 카톡에서 채팅을 보내면 인터넷이 끊겨도 데이터가 보내지고 몇차례 재요청 이후 x표시가 뜨는 것처럼
```

아래는 react-query 공식문서에 나와있는 낙관적 업데이트의 사용 예시이다.

핵심은 onMutate를 통해 실제 데이터가 백엔드에 전송되기 전에 상태를 업데이트하고 이후 성공과 실패에 따라 다른 상태를 보여주어야 한다는 것이다.

```js
const queryClient = useQueryClient()

useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] })

    const previousTodos = queryClient.setQueryData(['todos'], (old) => [
      ...old,
      newTodo,
    ])

    return { previousTodos }
  },

  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context.previousTodos)
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})
```

## 참고 문서

- [Next.js 13 버전에서 ReactQuery 사용시 서버 컴포넌트에서 클라이언트 컴포넌트로 pre-fetch 데이터 전달하는 방법](https://11001.tistory.com/221)
- [React Query - Hydration(SSR)](https://velog.io/@pjh1011409/React-Query-HydrationSSR)
- [Next.js 13에서 React Query SSR 적용하는 방법](https://velog.io/@ckstn0777/Next.js-13%EC%97%90%EC%84%9C-React-Query-SSR-%EC%A0%81%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
