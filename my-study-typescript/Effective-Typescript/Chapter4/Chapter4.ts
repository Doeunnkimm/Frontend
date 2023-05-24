/* 
    유효한 상태만 표현하는 타입을 지향하기 
    
    - 타입 설계를 명확하게함으로써 예상치 못한 버그가 수어들 여지를 줄일 수 있다.

    ⭐ 상태를 표현하는 타입을 만들 때에는 유효한 타입만을 가지고 있어야 한다.
*/

// a와 b는 반드시 가지고 c와 d속성은 선택적인 속성이다.

// 👎 지향해야 할 방식 (속성에 중점을 둔 타입 정의)
// interface State {
//   a: string;
//   b: string;
//   c?: string;
//   d?: string;
// }

// 👍 지향해야 할 방식 (상태에 중점을 둔 타입 정의)
interface StateOne {
  a: string;
  b: string;
}
interface StateTwo {
  a: string;
  b: string;
  c: string;
}
interface StateThree {
  a: string;
  b: string;
  d: string;
}
type State = StateOne | StateTwo | StateThree;

// ⭐⭐ 속성에 집중하기 보다 상태에 집중해야 한다 !! ⭐⭐
