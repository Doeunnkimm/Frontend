import {createContext, useContext, useReducer, useState} from 'react';
import {createAction} from '../utils/createAction';

// 전역 관리하고 싶은 state
const initialState = [
  {
    id: 1,
    name: '김성용',
  },
  {
    id: 2,
    name: '김도은',
  },
  {
    id: 3,
    name: '주호민',
  },
  {
    id: 4,
    name: '이병건',
  },
];

// 전역 저장소(store)를 만들겠다
export const UserContext = createContext(); // 비어있는 store
export const UserDisPatchContext = createContext(); // dispatch를 담을 새로운 store

export const useUserState = () => useContext(UserContext);
export const useUserDispatch = () => useContext(UserDisPatchContext);

export const ADD_STATE = createAction('ADD_STATE');
/*
   => ADD_STATE({id, name})
   ADD_STATE에 전달된 매개변수는 payload가 됨
*/
export const REMOVE_STATE = createAction('REMOVE_STATE');

//   reducer구현
const userListReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_STATE':
      return [...state, {id: action.payload.id, name: action.payload.name}];
    case 'REMOVE_STATE':
      return state.filter((user) => user.id !== action.payload.id);
    default:
      return;
  }
};

const ContextProvider = ({children}) => {
  //   const [state, setState] = useState(initialState);
  /* 
        useReducer로 state를 만들어서 state를 수정하는 로직을 밖으로 빼는 것
        전역 상태를 변경하는 로직은 따로 빼자
        전역 상태는 다른 컴포넌트에서도 사용하기 위해서 이므로
        reducer로 따로 빼서 그 상태를 바꾸는 함수도 재사용될 수 있음
        => 여기서의 useReducer의 역할 : 전역 상태를 관리하는 함수도 따로 빼서 사용하자
   */

  const [state, dispatch] = useReducer(userListReducer, initialState);

  return (
    /*
        UserContext는 비어있는 저장소였음
        여기에 initialState를 전달해주는 것 => 비어있는 저장소의 값을 채워준 것

        -> export시키고 최상위 컴포넌트(App.js)에서 설정해줘야 함
        => 이제 UserContext는 모든 컴포넌트에서 공유가 됨

        -> UserContext.Provider를 children(모든 컴포넌트)에게 전달 가능
    */
    <UserContext.Provider
      value={state} /*value={initialState}*/ /*value={[state, setState]}*/
    >
      <UserDisPatchContext.Provider value={dispatch}>
        {children}
      </UserDisPatchContext.Provider>
    </UserContext.Provider>
    /*
        비어있는 저장소 UserContext에 Provider 함수를 사용해서 감싸면
        그 안에 있는 하위 컴포넌트 들에게 이 비어있는 저장소를 사용할 수 있게 할 수 있음
        비어있는 저장소에는 initialState값을 넣어준다
    */
  );
};
export default ContextProvider;
