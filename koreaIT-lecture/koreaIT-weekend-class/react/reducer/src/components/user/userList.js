import {useUserState} from '../../context/user';

function UserList({onDeleteUser}) {
  const userList = useUserState();
  /*

    UserContext 스토어에 저장되어있는 state를 모든 컴포넌트에서 공유하고 있는 것
    전역 상태 관리를 했을 때 치명적인 단점은
    <<전역 렌더링(모든 컴포넌트에서 리렌더링 됨)>>
    => 전역 렌더링을 남발 X
    => depth가 깊어지는 경우에만 사용하는 것이 좋음

    ex. 사용자의 id, 프로필이미지, 여러 페이지에서 떠야하는 모달창
    
  */

  return userList.map((user, index) => (
    <div key={index}>
      {user.id}. {user.name}
      <button onClick={() => onDeleteUser(user.id)}>삭제</button>
    </div>
  ));
}
export default UserList;
