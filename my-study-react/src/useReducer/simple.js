import {useReducer} from 'react';

const reducer = (state, action) => {
  console.log('reducer가 호출되었습니다.');
};

function Simple() {
  const [state, dispatch] = useReducer(reducer, '');
  return <button onClick={() => dispatch()}>reducer를 호출</button>;
}
export default Simple;
