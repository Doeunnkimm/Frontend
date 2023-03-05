const UserCard = ({ user }) => {
  return (
    <div>
      <h2>--UserProfile--</h2>
      <img
        src={user.profileImg}
        alt={user.nickName}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
        }}
      />
      <h3>{user.nickName}</h3>
    </div>
  );
};
export default UserCard;
