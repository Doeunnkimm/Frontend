/* 
    ☀️ 아아템28. 유효한 상태만 표현하는 타입을 지향하기
    
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

/*
    ☀️ 아이템29. 사용할 때는 너그럽게, 생성할 때는 엄격하게

    - 입력값에 대해 너그럽게 처리, 출력값에 대해서는 엄격하게 처리 !
*/
type InputData = string | number;
type OutputData = string;

function processFn(input: InputData): OutputData {
  return typeof input === 'number' ? input.toFixed(2) : input.toUpperCase();
}

// 사용할 때는 너그럽게
const input1: InputData = 42;
const input2: InputData = 'Alice';

// 생성할 때는 엄격하게
const output1: OutputData = processFn(input1); // "42.00"
const output2: OutputData = processFn(input2); // "ALICE";

// 위 코드에서 InputData는 string 또는 number 타입이 될 수 있다.
// 이를 사용하는 processFn 함수의 매개변수 input은 입력에 대해 너그럽게 처리하고 있다.
// processFn 함수는 전달받는 input이 숫자라면, 문자열이라면에 따라 리턴하게 된다.
// 반환 값이 OutputData의 경우 함수의 출력을 엄격하게 문자열 타입으로 지정하였다.

// 이 예제에서 사용할 때는 너그럽게 처리(InputData의 경우 string 혹은 number)
// 생성할 때는 엄격하게 처리(OutputData의 경우 string)하는 방식을 따르고 있다.
// 이렇게 함으로써 해당 함수의 사용범위와 유연성을 높일 수 있다.
