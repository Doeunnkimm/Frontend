import {ACTION_TYPES} from './reducer/reducer';

function Student({name, dispatch, id, isHere}) {
  const onClickDeleteStudent = () => {
    dispatch({
      type: ACTION_TYPES.delete,
      payload: {id},
    });
  };

  const onClickMarkStudent = () => {
    dispatch({
      type: ACTION_TYPES.mark,
      payload: {id},
    });
  };

  return (
    <div>
      <span
        style={{
          textDecoration: isHere ? 'line-through' : 'none',
          color: isHere ? 'gray' : 'black',
        }}
        onClick={onClickMarkStudent}
      >
        {name}
      </span>
      <button onClick={onClickDeleteStudent}>삭제</button>
    </div>
  );
}
export default Student;
