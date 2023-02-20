import {useState} from 'react';

function AddUser({onAddUser}) {
  const [userName, setUserName] = useState('');
  const onChangeUserName = (e) => setUserName(e.target.value);

  const onClickAddUserBtn = () => {
    onAddUser(userName);
    setUserName(''); // clear
  };

  return (
    <div>
      <input value={userName} onChange={onChangeUserName} />
      <button onClick={onClickAddUserBtn}>추가</button>
    </div>
  );
}
export default AddUser;
