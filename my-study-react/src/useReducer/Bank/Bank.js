import {useState, useReducer} from 'react';
import {ACTION_TYPES, reducer} from './reducer/reducer';

// reducer - state를 업데이트 하는 역할 (은행)
// dispatch - state를 업데이트를 위한 요구
// action - 요구의 내용

function Bank() {
  const [number, setNumber] = useState(0);
  const [money, dispatch] = useReducer(reducer, 0);
  // money는 reducer를 통해서만 업데이트됨
  // reducer를 통해 money를 업데이트하고 싶을 때마다 dispatch를 불러줄 것임

  const onClickDeposit = () => {
    dispatch({
      type: ACTION_TYPES.deposit,
      payload: number,
    });
  };

  const onClickWithdraw = () => {
    dispatch({
      type: ACTION_TYPES.withdraw,
      payload: number,
    });
  };

  return (
    <div>
      <h2>useReducer 은행에 오신 것을 환영합니다.</h2>
      <p>잔고: {money}원</p>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(parseInt(e.target.value))}
        step="1000"
      />

      <button onClick={onClickDeposit}>예금</button>
      <button onClick={onClickWithdraw}>출금</button>
    </div>
  );
}
export default Bank;
