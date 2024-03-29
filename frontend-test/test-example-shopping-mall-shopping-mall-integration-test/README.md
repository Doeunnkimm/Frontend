## 통합 테스트 대상 선정하기

- 통합 테스트에서는 구성된 비즈니스 로직을 적절한 단위로 나눠 컴포넌트 집합을 검증해야 한다.
- 비즈니스 로직을 기준으로 통합 테스트를 나눌 때는
  - 가능한 한 모킹을 하지 않고 실제와 유사하게 검증한다.
  - 비즈니스 로직을 처리하는 상태 관리나 API 호출은 상위 컴포넌트로 응집한다.
  - 변경 가능성을 고려해 여러 도메인의 기능이 조합된 비즈니스 로직은 나눠 검증한다
- 이를 통해 컴포넌트 간 결합도를 낮추고 견고한 설계를 통해 유지 보수하기 좋은 코드를 작성할 수 있다.

## 상태 관리 모킹하기

**상태 관리와 통합 테스트**

- 예제에서는 `zustand`를 사용하여 앱의 상태를 관리
- 원하는 상태로 통합 테스트를 하기 위해 zustand 모킹 필요
  - ex) 장바구니에 상품이 담긴 상태

**앱의 전역 상태를 모킹해 테스트 전/후에 값을 변경하고 초기화해야 한다**

- `__mocks/zustand.js`를 통해 자동 모킹을 적용해 스토어를 초기화하자
- `mockZustandStore`의 유틸 함수를 통한 `zustand` 스토어의 상태 변경
- React Redux나 Recoil과 같은 상태 관리 라이브러리도 모킹 가이드를 제공

**ProductInfoTable 통합 테스트**

- cart, user 스토어 + ProductInfoTableRow(MUI)가 결합된 컴포넌트
- ProductInfoTable과 같은 컴포넌트에 state와 API에 대한 제어 코드를 응집해 관리하는 것이 좋다.
  - 로직 파악 및 유지 보수에 좋으며, 통합 테스트의 단위를 깔금하게 나눌 수 있다.
- 비즈니스 로직을 실제 사용성과 유사하도록 사용자 인터랙션을 통해 컴포넌트 통합 테스트로 검증할 수 있다.

## msw로 API 모킹하기

- 통합 테스트에서 API를 호출하는 컴포넌트를 시뮬레이션 하기 위해서는 프로젝트에서 사용하는 tanstack query 설정과 API에 대한 모킹이 필요

**Tanstack Query**

- API 호출에 따른 로딩, 에러 상태 처리 및 페이지네이션 캐싱 등의 편의성을 위해 사용
- 기존 설정(ex. retry)이 테스트에 영향을 주지 않도록 설정(render.jsx) 수정

**Mock Service Worker(MSW)**

- Node.js, 브라우저 환경을 위한 API 모킹 라이브러리
- 브라우저는 서비스 워커를 사용, Node.js 환경에서는 내부적으로 XHR, fetch 등의 요청을 가로채는 인터셉터를 사용
- setup과 teardown을 사용해 테스트 실행 전, 후에 API를 모킹하고 해제

## RTL 비동기 유팅 함수를 활용한 테스트 작성

- `handlers.js`에서 모킹 데이터 기준으로 상품 목록 API의 페이징 응답 결과를 반환
  - `request`, `response`를 사용해 원하는 시나리오를 만들어 테스트에 활용

**findBy 쿼리**

- 쿼리가 통과하거나 시간 초과될 때까지 재시도한다. (1초동안 50ms간격으로)
- API 호출과 같은 **비동기 처리로 인한 변화를 감지해야 할때 사용하기** 좋다.
- RTL에서는 findBy같은 비동기 메서드의 반환값은 Promise이기에, 해당 요소를 사용하려면 `await`나 `then`을 사용해야 한다.

## 통합 테스트 작성하기 - ProductFilter

**ProductFilter**

- 테스트를 위한 사전 준비
  - 컴포넌트의 초기 필터 정보를 갱신하기 위한 filter 스토어 모킹
  - 카테고리 필드의 정보를 렌더링하기 위한 API 호출을 msw로 모킹
- 테스트 작성하기
  - Setup 과정(beforeEach)에서 스토어 모킹
  - 스파이 함수를 통한 스토어의 액션 호출 여부 확인
  - getByLabelText, getByPlaceholderText 쿼리를 통한 요소 조회
  - findBy~ 쿼리를 통한 카테고리 API 호출 기다리기

## 통합 테스트의 한계

- 배송(ShippingInformationForm), 상품 정보(ItemList), 결제 정보(Payment) 도메인 단위로 비즈니스 로직을 통합 테스트로 검증하고 있음
  - 각 컴포넌트의 책임은 검증하지만, 페이지에서 가장 중요한 구매 프로세스는 검증하지 못함
- 통합 테스트의 한계
  - 페이지 내 구매 기능처럼 전체 워크플로우를 검증하는 경우 지나치게 모킹에 의존하게 됨
  - 모킹 시 시나리오를 누락하거나, 잘못된 모킹이 있을 수 있어 신뢰가 낮아짐
  - 모킹 유지 보수 비용도 증가
- E2E 테스트를 사용하면 앱을 구동시켜 모킹에 의존하지 않고 워크플로우를 검증할 수 있음
- 개발 단계에서는 단위/통합 테스트로 도메인 별 비즈니스 로직을 검증하고 앱의 완성 단계에 전체 워크 플로우를 E2E 테스트로 검증하자
