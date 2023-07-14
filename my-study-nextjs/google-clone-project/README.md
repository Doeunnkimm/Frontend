# Google Clone Next@13

## Random Word API

- [DOCS](https://random-word-api.herokuapp.com/home)

## loading io

- [DOCS](https://loading.io/)

## 서버 컴포넌트 & 클라이언트 컴포넌트

### 서버 컴포넌트

- 서버 컴포넌트를 통해 개발자는 서버 인프라를 더 잘 활용할 수 있다.
- 예를 들어, Data Fetching을 데이터베이스에 더 가까운 서버로 이동하고 이전에는 서버의 클라이언트 JS 번들 크기에 영향을 주던 큰 종속성을 유지하여 성능 향상 가능
- 서버 컴포넌트를 사용하면 초기 페이지 로드가 더 빨라지고 클라이언트 측 JS 번들 크기가 줄어든다.
- Next.js로 로드되면 Hydration을 통해 초기 HTML이 서버에서 렌더링되고 클라이언트 측 런타임을 비동기식으로 로드하여 애플리케이션에 상호작용을 추가할 수 있다.

### 클라이언트 컴포넌트

- 클라이언트 컴포넌트를 사용하면 응용 프로그램에 클라이언트 측 상호작용을 추가할 수 있다.
- Next.js에서는 서버에서 pre-render되고 클라이언트에서 hydrate된다.
- 페이지 라우터의 컴포넌트가 항상 작동하는 방식으로 클라이언트 컴포넌트를 생각할 수 있다.
- `"use clinet"`는 서버 전용 코드와 클라이언트 코드 사이에 있다.
- `"use client"`가 파일에서 정의되면 자식 구성 요소를 포함하여 파일로 가져온 다른 모든 모듈은 클라이언트 번들의 일부로 간주된다.

| What do you need to do?                          | Server Component | Client Component |
| :----------------------------------------------- | :--------------: | :--------------: |
| Data Fetching                                    |       ⭕️        |        ❌        |
| 백엔드 리소스에 접근                             |       ⭕️        |        ❌        |
| 민감한 정보를 서버에 보관(access token, api 키)  |       ⭕️        |        ❌        |
| 서버에 대한 큰 종속성 유지/클라이언트 측 JS 감소 |       ⭕️        |        ❌        |
| 상호작용 및 이벤트 리스너(onClick, onChange)     |        ❌        |       ⭕️        |
| 상태 및 생명주기 함수 사용(useState, useEffect)  |        ❌        |       ⭕️        |
| 브라우저 전용 API 사용                           |        ❌        |       ⭕️        |
| React 클래스 컴포넌트 사용                       |        ❌        |       ⭕️        |

## "use client"

- `/app` 디렉토리의 모든 구성 요소 → **서버 컴포넌트**로 제공
- 그러나, 서버 측에서 할 수 없는 일이 있다.

  - window object를 다루기, 상태 관리 등..

    ⭐️ 이와 같은 상황을 위해 클라이언트 컴포넌트가 존재!

- `use client`를 통해 클라이언트 컴포넌트로 선언 가능

  ```tsx
  'use client'
  export default function MyClientComponent() {
    // code here
  }
  ```

- 예를 들어, 클라이언트 컴포넌트로 선언하지 않고 `useState` 훅을 사용하려고 하면 오류 발생

  ```tsx
  import { useState } from 'react'
  export default function MyClientComponent() {
    const [myVal, setMyVal] = useState(0)
    return <h1>{myVal}</h1>
  }
  ```

  아래와 같은 오류 발생

  ```bash
  You're importing a component that needs useState. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
  ,----
  1 | import { useState } from "react"
  :          ^^^^^^^^
  `----
  Maybe one of these should be marked as a client entry with "use client":
  ```

- 또는 시도하면 다음과 같은 오류 발생

  ```tsx
  import { useEffect } from 'react'

  export default function WithEffectPage() {
    useEffect(() => {})
    return <h1>da</h1>
  }
  ```

  ```bash
  You're importing a component that needs useEffect. It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
  ```

### NextJS의 클라이언트 컴포넌트에 대한 참고 사항

1. `"use client"` 지시문은 파일의 첫 번째 줄로 추가해야 한다.
2. 서버 컴포넌트를 클라이언트 컴포넌트에 직접 사용할 수 없다.
3. 성능 측면에서 우리는 클라이언트 컴포넌트를 최소한으로 유지해야 한다.
   예를 들어, [공식문서](https://nextjs.org/docs/getting-started/react-essentials#moving-client-components-to-the-leaves)에 따르면 상태를 사용하는 search bar가 있는 경우, 전체 페이지를 클라이언트 컴포넌트로 선언하는 대신 클라이언트 컴포넌트에서 search bar를 추출해야 한다.

   ```tsx
   // SearchBar is a Client Component
   import SearchBar from './SearchBar'
   // Logo is a Server Component
   import Logo from './Logo'
   // Layout is a Server Component by default
   export default function Layout({ children }) {
     // code here
   }
   ```

### NexJS 13에서 "use client" 지시문을 사용하는 경우

다음 상황 중 하나에서 컴포넌트를 클라이언트 컴포넌트로 선언해야 한다.

1. 컴포넌트에 이벤트 리스너(ex. onClick, onChange)을 사용할 때
2. `useState`, `useReducer` 같은 훅을 사용할 때
3. 브라우저 전용 API(ex. window, document)를 사용할 때
4. 구성 요소에서 localStorage를 사용하려는 경우
5. data fetching에 대한 몇 가지 특별한 경우

### 클라이언트 컴포넌트에서 서버 컴포넌트 가져오기

서버 컴포넌트를 NextJS 13 클라이언트 컴포넌트로 직접 가져올 수 없다. 그 이유는 서버 컴포넌트가 서버 측에서 파일 또는 데이터베이스 읽기/쓰기와 같은 작업을 위한 코드를 포함할 수 있기 때문이다. 클라이언트에서 렌더링된 서버 컴포넌트만 사용하여 이 문제를 극복할 수 있다.

### 클라이언트 컴포넌트에서 서버 전용 코드 유지

JS 모듈은 서버와 클라이언트 컴포넌트 간에 공유될 수 있으므로 서버에서만 실행되도록 의도된 코드가 클라이언트에 몰래 들어갈 수 있다.

예를 들어 다음 Data Fetching 함수를 사용한다.

```tsx
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```

얼핏 보면 `getData`가 서버와 클라이언트 모두에서 작동하는 것처럼 보인다. 하지만 환경 변수를 보게 되면 `NEXT_PUBLIC` 접두사가 없기 때문에 서버에서만 액세스할 수 있는 전용 변수이다. Next.js는 보안 정보 유출을 방지하기 위해 클라이언트 코드에서 private 환경 변수를 빈 문자열로 바꾼다.

결과적으로 `getData()`는 클라이언트에서 import하고 실행할 수 있지만 예상대로 동작하지 않는다. 그리고 변수를 공개하면 클라이언트에서 함수가 작동하지만 중요한 정보가 유출된다.

따라서 이 함수는 서버에서만 실행되도록 의도하여 작성되었다.

### The "server only" package

위와 같이 의도하지 않은 서버 코드의 클라이언트에서의 사용을 방지하기 위해, `server-only` 패키지를 사용하여 개발자가 실수로 이러한 모듈 중 하나를 클라이언트 컴포넌트로 가져온 경우 빌드 타임 오류를 제공할 수 있다.

```tsx
import 'server-only'

export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })

  return res.json()
}
```

이제 `getData()`를 가져오는 모든 클라이언트 컴포넌트는 이 모듈을 **서버에서만 사용할 수 있음**을 설명하는 빌드 타임 오류를 전달한다.

## Data Fetching

- 클라이언트 컴포넌트에서 데이터를 가져올 수 있지만
- 클라이언트에서 데이터를 가져와야 하는 특별한 이유가 없는한 서버 컴포넌트에서 데이터를 가져오는 것이 좋다.
- Data Fetching을 서버에서 하게 되면 성능과 사용자 경험이 향상된다.
