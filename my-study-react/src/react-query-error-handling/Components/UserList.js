import useGetUser from '../Hooks/Queries/get-user';

const UserList = () => {
  // data에는 응답값 전체가 담겨있다
  const { data: userList, error, status, isLoading } = useGetUser();
  console.log(userList);

  return (
    <div>
      {userList &&
        userList.map((user) => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
          </div>
        ))}
    </div>
  );
};
export default UserList;
