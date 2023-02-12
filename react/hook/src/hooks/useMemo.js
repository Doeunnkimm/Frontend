import {useMemo, useRef, useState} from 'react';

function UseMemo() {
  const [state1, setState1] = useState(false); // 렌더링용
  const [state2, setState2] = useState(false);
  const arr = useRef([1, 2, 3, 4]);

  const Memocount = useMemo(() => {
    // 렌더링 처음될 때부터
    // 그대로 유지되어야 하는 값을
    // 매번 연산하는 것이 아니라
    // 처음 렌더링되었을 떄마 연산하기 위해 사용
    arr.current.push(arr.length + 1);
    console.log(arr);
    return arr.current;
  }, [state1]); // state2가 바뀌어도 캐싱하고 있음

  // useMemo는 연산된 결과를 반환하여 캐싱하고 있음
  // 의존성 배열에 있는 state가 변할 때마다
  // useMemo 콜백함수가 실행됨

  /*

    => *** 한번 렌더링 이후로 연산할 필요가 없다
        (렌더링 최적화, 렌더링 시간을 감소 시킬 수 있다.)

    => 그러나 특정 state가 바뀌었을 때는 해당 연산을 다시 해야만 한다.
       그렇다면 의존성 배열에 해당 state 값을 넣어서 그 state가 변경되었을 때만
       연산을 재실행 시킬 수 있다.

    첫화면 렌더링 -> useMemo 실행 -> 의존성 배열이 비어있으면 -> 렌더링 되도 실행 X
    의존성 배열에 state가 추가되면 -> 해당 state가 바뀔 때마다 실행

    만약 useMemo가 없다면 값은 계속 똑같겠지만, 렌더링 될 때마다 해당 함수를 
    계속 실행하기 때문에 렌더링이 오래 걸린다.

    단, 메모리냐 cpu냐 하는 것은 개발자의 이견에 따라 다르다.
    캐싱도 cost(비용)이 든다.

  */

  return (
    <>
      <div>{Memocount.length}</div>
      <button onClick={() => setState1((prev) => !prev)}>+</button>
      <button onClick={() => setState2((prev) => !prev)}>유지</button>
    </>
  );
}
export default UseMemo;
