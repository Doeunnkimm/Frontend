import {useReducer, useState} from 'react';
import {ACTION_TYPES, reducer} from './reducer/reducer';
import Student from './Student';

const initialState = {
  count: 0,
  students: [],
};

function Attendance() {
  const [name, setName] = useState('');
  const [studentInfo, dispatch] = useReducer(reducer, initialState);

  const onChangeNameInput = (e) => setName(e.target.value);

  const onClickAddNewStudent = () => {
    dispatch({
      type: ACTION_TYPES.add,
      payload: {
        name,
      },
    });
  };

  return (
    <div>
      <h1>출석부</h1>
      <p>총 학생수: {studentInfo.count}</p>
      <input
        type="text"
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={onChangeNameInput}
      />
      <button onClick={onClickAddNewStudent}>추가</button>
      {studentInfo.students.map((student) => (
        <Student
          key={student.id}
          name={student.name}
          dispatch={dispatch}
          id={student.id}
          isHere={student.isHere}
        />
      ))}
    </div>
  );
}
export default Attendance;
