import {useRef} from 'react';
import {useDispatch} from 'react-redux';

const UserAddForm = () => {
  /*
    rootReducer에 action 객체를 보낼 수 있음
  */
  const dispatch = useDispatch();
  const name = useRef(null);

  const onAddUser = () => {
    /*
        전역 상태 관리이므로
        reducer를 참고하고 있는 모든 컴포넌트가 함께 리렌더링 된다
        
    */
    dispatch({
      type: 'ADD_USER',
      payload: {
        id: Math.floor(Math.random() * 100000),
        name: name.current.value,
      },
    });
  };

  return (
    <>
      <input ref={name} />
      <button onClick={onAddUser}>추가</button>
    </>
  );
};
export default UserAddForm;
