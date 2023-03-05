import {
  RESET_USERS,
  useUserDispatchContext,
} from '../../../../../store/3_context';

const ContextQ2Form3 = () => {
  const dispatch = useUserDispatchContext();

  const onResetUserList = () => dispatch(RESET_USERS());

  return (
    <div>
      <h1>Q2Form3</h1>
      <button onClick={onResetUserList}>RESET</button>
    </div>
  );
};
export default ContextQ2Form3;
