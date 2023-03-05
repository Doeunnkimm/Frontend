import { useRef } from 'react';
import {
  ADD_USER,
  useUserContext,
  useUserDispatchContext,
} from '../../../../../store/3_context';
import ContextQ2Form2 from './Form2';

const ContextQ2Form = () => {
  const name = useRef();
  const nickname = useRef();

  const userList = useUserContext();
  const dispatch = useUserDispatchContext();

  console.log(userList);

  const onAddUser = () => {
    if (!name.current.value || !nickname.current.value)
      return alert('내용을 모두 입력했는지 확인해주세요');

    dispatch(
      ADD_USER({
        id: Math.floor(Math.random() * 10000),
        name: name.current.value,
        nickname: nickname.current.value,
      })
    );

    name.current.value = '';
    nickname.current.value = '';
  };

  return (
    <div>
      <h1>Q2Form</h1>
      <input placeholder="name" ref={name} />
      <input placeholder="nick-name" ref={nickname} />
      <button onClick={onAddUser}>추가</button>
      <ContextQ2Form2 />
    </div>
  );
};
export default ContextQ2Form;
