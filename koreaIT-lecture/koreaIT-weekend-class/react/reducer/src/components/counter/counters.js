import {useReducer, useState} from 'react';
import {countReducer} from '../../reducer/count';

function Counter() {
  //   const [count, setCount] = useState(0);

  //   const onIncrementCount = () => setCount(count + 1);
  //   const onDecrementCount = () => setCount(count - 1);

  // 첫번째 인자 : 우리가 만든 외부에 있는 로직
  // 두번째 인자 : 초기값
  const [count, dispatch] = useReducer(countReducer, 0);
  // useReducer count는 dispatch로 전달된 action의 행위로만 변경됨
  // count는 React의 state는 맞음
  // dispatch는 데이터를 전달하는 함수
  // dispatch에 들어온 데이터는 countReducer에 전달해줌
  // count는 dispatch에 의해서만 값이 변경될 것임
  const onIncrementCount = () => {
    // 따라서 클릭 이벤트는 다음과 같은 로직으로 동작
    // 버튼을 클릭하면 dispatch로 아래 객체를 countReducer로 전달
    dispatch({
      // dispatch 내부에 있는 내부 객체가 countReducer의 action으로 전달됨
      type: 'INCREMENT',
      count: 1,
    });
  };

  /*
    useReducer의 역할은
    복잡한 상태 업데이트 로직을
    컴포넌트 안에서 관리하지 말고 바깥에 따로 빼서 관리할 수 있도록 하자

    flux 패턴
    action 객체를 dispatcher를 통해 store(reducer)에 전달하여
    비지니스 로직(기능)을 실행한다.
  */

  const onDecrementCount = () => {
    dispatch({
      type: 'DECREMENT',
      count: 1,
    });
  };

  return (
    <>
      <button onClick={onIncrementCount}>+</button>
      {count}
      <button onClick={onDecrementCount}>-</button>
    </>
  );
}
export default Counter;
