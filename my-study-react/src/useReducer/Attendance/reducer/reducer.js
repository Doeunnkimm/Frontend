export const ACTION_TYPES = {
  add: 'add-student',
  delete: 'delete-student',
  mark: 'mark-student',
};

export const reducer = (state, action) => {
  console.log('reducer 호출');

  switch (action.type) {
    case ACTION_TYPES.add:
      const name = action.payload.name;
      const newStudent = {
        id: Date.now(),
        name,
        isHere: false,
      };
      return {
        count: state.count + 1,
        students: [...state.students, newStudent],
      };
    case ACTION_TYPES.delete:
      return {
        count: state.count - 1,
        students: state.students.filter(
          (student) => student.id !== action.payload.id
        ),
      };
    case ACTION_TYPES.mark:
      return {
        count: state.student,
        students: state.students.map((student) => {
          if (student.id === action.payload.id) {
            return {...student, isHere: !student.isHere};
          }
          return student;
        }),
      };
    default:
      return state;
  }
};
