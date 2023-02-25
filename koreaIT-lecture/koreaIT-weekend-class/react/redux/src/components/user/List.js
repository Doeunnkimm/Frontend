import {useSelector} from 'react-redux';

const UserList = () => {
  /*
    rootReducer에 등록된 모든 state를 가져오기 위해
    아래에서 state는 전체 저장소 정도의 의미?
    store 전체를 가져옴

    (state) => state.user : state에서 user에 담은 state(=initialState)만 가져옴
    */

  const userList = useSelector((state) => state.user); // user에 담은 모든 state를 가져옴
  /* 
    user의 state를 가져왔음(=> initialState) 
     => userList = user의 state = initialState
  */

  console.log(userList);

  return (
    <>
      {userList.map((user, index) => (
        <div key={user.id}>
          {index + 1}. {user.name}
        </div>
      ))}
    </>
  );
};
export default UserList;
