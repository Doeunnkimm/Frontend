## UI 테스트와 스냅샷 테스트

**스냅샷 테스트(jsDOM)는**

- UI 컴포넌트의 렌더링 결과나 함수의 결과를 직렬화하여 기록하고 스냅샷과 비교하는 테스트
- 이를 통해 기존 UI와 어떤 부분이 변경되었는지 탐지하여 의도하지 않은 변경 사항을 빠르게 찾아 수정할 수 있다.

**vitest에서 스냅샷을 테스트할 때는**

- `toMatchSnapshots()` : 스냅샷 기록을 별도 파일로 관리
- `toMatchInlineSnapshots()` : 스냅샷 기록을 테스트 파일 내에서 관리

## 스냅샷 테스트의 한계

**스냅샷 테스트 관리는 어렵다**

- 컴포넌트의 크기가 커지고 복잡할수록 스냅샷 결과는 가독성이 떨어진다.
- 개개인에 따라 무분별한 스냅샷 업데이트가 발생할 수 있다.

**이런 문제를 해결하기 위해**

- `eslint`의 `no-large-snapshots`와 같은 규칙을 사용해 스냅샷을 간결하게 유지하자

**그럼에도..**

- 여전히 스냅샷 업데이트는 쉽고, 잘못 업데이트될 가능성은 크다.
- 실제로 렌더링을 하는 것이 아니기 때문에 CSS의 변경 또는 UI 상에서 어떤 변화가 있는지 정확하게 감지할 수 없다.
- TDD 사이클과는 맞지 않다.
