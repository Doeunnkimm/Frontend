import { createContext, useContext, useReducer } from 'react';
import { createAction } from './createAction';

export const UserContext = createContext(); // userList를 담을 store
export const UserDispatchContext = createContext(); // userList의 상태를 변경시킬 로직이 담길 state

export const useUserContext = () => useContext(UserContext);
export const useUserDispatchContext = () => useContext(UserDispatchContext);

export const ADD_USER = createAction('ADD_USER');
export const ADD_STATUS = createAction('ADD_STATUS_ALL_USER');
export const RESET_USERS = createAction('RESET_USERS');

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, action.payload];

    case 'ADD_STATUS_ALL_USER':
      const newUserList = [...state];
      newUserList.map((user) => (user.isEdit = true));
      return newUserList;

    case 'RESET_USERS':
      return [];

    default:
      return state;
  }
};

const initialState = [{ id: 1, name: '홍길동', nickname: '히히' }];

const UserProvider = ({ children }) => {
  const [userList, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={userList}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
