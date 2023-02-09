import {useState} from 'react';

function UseState() {
  //   let count = 0;
  const [count, setCount] = useState(0);

  /*
        useState는 변수를 react의 state로 관리하는 함수
        [변수명, 바꿀 수 있는 순수함수] = useState(기본값)
        let/const 변수명 = 기본값;

        useState는 배열을 리턴하고 있음
        그래서 배열의 구조분해로 값을 받는 것
   */

  const onAddNumber = () => {
    // count++;
    setCount((count) => count + 1);
  };

  const onMinusNumber = () => {
    // count--;
    setCount((count) => count - 1);
  };

  console.log(count);

  return (
    <div>
      <button onClick={onAddNumber}> + </button>
      {count}
      <button onClick={onMinusNumber}> - </button>
    </div>
  );
}
export default UseState;
