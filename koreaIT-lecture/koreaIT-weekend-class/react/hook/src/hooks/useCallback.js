import {useCallback, useState} from 'react';

function UseCallback() {
  const [count, setCount] = useState(0);
  const [state, setState] = useState(false);

  const onAddNumber = useCallback(() => {
    if (!state) return; // 활성화가 되어 있지 않다면 바로 함수 탈출
    setCount((count) => count + 1);
  }, [state, count]); // 즉 해당 함수는 state와 count와만 관련이 된 함수
  // 그래서 state와 count가 변했을 때만 재선언 되게 됨

  const onMinusNumber = useCallback(() => {
    if (!state) return; // 활성화가 되어 있지 않다면 바로 함수 탈출
    setCount((count) => count - 1);
  }, [state, count]);

  /*
    안에서 활용되는 state값을 의존성 배열에 넣어주면 된다.
    해당 함수와 연관 없는 state가 변동 되었을 때
    해당 함수를 재선언할 필요는 없다.

    따라서 이를 캐싱하고 있다가 재선언 하지 않고
    가져다가 사용하는 것을 useCallback이라 한다.

    렌더링 최적화
    cost(비용)이 존재한다.
  */

  return (
    <>
      <div>
        <button onClick={onAddNumber}> + </button>
        {count}
        <button onClick={onMinusNumber}> - </button>
      </div>
      <button onClick={() => setState((prev) => !prev)}>
        {state ? '비활성화' : '활성화'}
      </button>
    </>
  );
}
export default UseCallback;
