import {
  ADD_STATE,
  REMOVE_STATE,
  useUserDispatch,
  useUserState,
} from '../../context/user';
import AddUser from './addUser';
import UserList from './userList';

function User() {
  /* UserContext는 value={[state, setState]}로 채워져있는 store였음 */
  const userList = useUserState(); // UserContext.Provider에 value로 넘긴 값을 받아옴
  const dispatch = useUserDispatch();

  // const [userList, setUserList] = useState([
  //   {
  //     id: 1,
  //     name: '김성용',
  //   },
  //   {
  //     id: 2,
  //     name: '김도은',
  //   },
  //   {
  //     id: 3,
  //     name: '주호민',
  //   },
  //   {
  //     id: 4,
  //     name: '이병건',
  //   },
  // ]);

  const onDeleteUser = (id) => {
    // const deleteUserList = userList.filter((user) => user.id !== id);
    // setUserList(deleteUserList);

    // dispatch({
    //   type: REMOVE_STATE,
    //   payload: {id},
    // });

    dispatch(REMOVE_STATE({id}));
  };

  const onAddUser = (name) => {
    // const newUser = {
    //   id: userList[userList.length - 1].id + 1, // 마지막 인덱스값의 id에 +1
    //   name,
    // };
    // setUserList([...userList, newUser]);
    const id = userList[userList.length - 1].id + 1;
    // dispatch({
    //   type: ADD_STATE,
    //   payload: {
    //     id,
    //     name,
    //   },
    // });

    dispatch(ADD_STATE({id, name}));
  };

  return (
    <>
      <UserList onDeleteUser={onDeleteUser} />
      <AddUser onAddUser={onAddUser} />
    </>
  );
}
export default User;
