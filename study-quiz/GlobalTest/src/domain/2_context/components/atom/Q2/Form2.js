import {
  ADD_STATUS,
  useUserDispatchContext,
} from '../../../../../store/3_context';

const ContextQ2Form2 = () => {
  const dispatch = useUserDispatchContext();

  const onAddStatus = () => dispatch(ADD_STATUS());

  return (
    <div>
      <h1>Q2Form2</h1>
      <button onClick={onAddStatus}>STATUS 추가</button>
    </div>
  );
};
export default ContextQ2Form2;
