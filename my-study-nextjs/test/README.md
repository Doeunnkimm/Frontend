# Next.js에서 Test 하기

Next.js + TypeScript 환경에서 Test해보기

## Unit Test

### 0. install

```bash
$ yarn add -D jest ts-jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- **jest**: 테스팅 라이브러리
- **ts-jest**: TypeScript로 작성된 프로젝트에서 Jest 사용 가능하도록
- **jest-environment-jsdom**: Jest의 기본환경인 jsdom을 사용하여 가상 DOM 환경을 제공하는 패키지
- **@testing-library/react**: React 컴포넌트의 유닛 테스트 및 통합 테스트를 위해 사용되는 라이브러리
- **@testing-library/jest-dom**: Jest에서 DOM와 관련된 함수들을 제공하는 패키지
- **@types/jest**: TypeScript용 Jest 타입 정의 파일

### 1. package.json에 script 추가

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "test": "jest --watch"
}
```

`jest --watch`는 file이 변경될 때마다 테스트를 다시 시작시킨다. 더많은 Jest CLI 옵션에 대해 알고 싶다면 [Jest Docs](https://jestjs.io/docs/cli#reference)를 참고!

### 3. setupTest.ts - testing-library import

📜 src/setupTest.ts

```ts
import '@testing-library/jest-dom'
```

이를 입력해주어야 DOM 요소와 관련된 assertion 함수를 사용 가능하다. 예를 들어 `.toHaveTextContent`, `.toBeInTheDocument` 등이 있다.

이를 통해 DOM 요소의 텍스트 내용, 존재 여부, 스타일, 속성 등을 검증할 수 있다. 즉, React 컴포넌트의 렌더링 결과가 예상대로 동작하는지 확인할 수 있다.

### 4. ts-jest config init

```bash
$ yarn ts-test config:init
```

하게 되면 루트 경로에 jest.config.js 파일이 생성된다.

### (선택) MSW로 Testing setup

#### (1) install

```bash
$ yarn add -D msw
```

#### (1) config init

```bash
$ yarn msw init public/ --save
```

#### (2) handlers 등록

msw에서 handlers는 특정 네트워크 요청에 대한 응답을 정의하는 역할을 한다. 해당하는 요청이 들어왔을 때 어떤 응답을 반환할지를 정의한다.

handlers 배열 안에는 msw의 rest 함수로 정의된 내용을 넣어주면 된다.

📜 src/mocks/handlers.ts

```ts
import * as Apis from './apis'

export const handlers = [...Object.values(Apis)]
```

#### (3) 가상 server 등록

네트워크 요청을 가상으로 처리하기 위해 사용한다. 주로 test 환경에서 서버의 요청과 응답을 테스트하기 위해 설정한다.

📜 src/mocks/server.ts

```ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)
```

#### (4) api 정의

필요한 요청/응답 코드를 작성해 준다.

📜 src/mocks/apis/posts.tsx

```ts
import type { PostProps } from '@/types'
import { rest } from 'msw'
import { posts } from '../fixture'

/**
 * 게시물 목록 조회
 */
export const getPostList = rest.get(
  'https://jsonplaceholder.typicode.com/posts',
  (_, res, ctx) => {
    return res(ctx.status(200), ctx.json<PostProps[]>(posts)) // status를 포함하지 말자..⭐️
  }
)
```

### 5. test 파일 추가

`src/tests` 폴더에 test 파일을 추가해 보자 (폴더의 위치는 각자 상황에 맞게 정하면 된다)

- **describe**

  - 관련된 테스트들의 그룹(스코프)을 정의하고 설명한느 데 사용
  - 콜백함수를 포함하며, 콜백함수 내에서는 다양한 테스트 케이스나 블록을 정의할 수 있다.
  - 주로 테스트의 섹션, 모듈, 컴포넌트 등을 그룹화하는데 사용

- **it**
  - 개별 테스트 케이스를 정의
  - 각각의 it 함수 내에서는 테스트 케이스에 대한 구체적인 로직을 작성
  - 일반적으로 주어진 상황과 결과에 대한 내용을 자세하게 설명하는 문자열과 함께 사용

아래 파일에서 api 요청에 대한 테스트를 해보자.

📜 **src/tests/apis.test.ts**

```ts
import { getPostList } from '@/apis'
import { posts } from '@/mocks/fixture'

describe('/apis', () => {
  it('getPostList() - 함수 호출 시, 게시글 목록을 받아옵니다.', async () => {
    const { server } = await import('../mocks/server')
    server.listen({ onUnhandledRequest: 'warn' }) // 응답이 없는 경우 warning

    // Given, When
    const res = await getPostList()

    // Then
    expect(res).toStrictEqual(posts)
  })
})
```

```
🤔 server만은 동적으로 import한 이유 ?
   테스트 케이스가 시작될 때마다 초기화되고 설정되는 것을 원해서
   정적으로 import할 경우 스크립트 파일 코드가 로드될 때 초기화되므로 테스트 케이스에서 개별적으로 제어하기 어려워진다.
```

## 에러를 해결할 수 있었던 방법

- 실제 api 주소와 handler를 통한 api 주소가 동일한지 꼭 확인하자

# 참고

- [[Next.js] jest로 unit Test 하기](https://nuhends.tistory.com/129)
- [[MSW]Mock Service Worker](https://velog.io/@hyo123/MSW-Mock-Service-Worker)
- [MSW를 활용하는 Front-End 통합테스트](https://fe-developers.kakaoent.com/2022/220825-msw-integration-testing/)
