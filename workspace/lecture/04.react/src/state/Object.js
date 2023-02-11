import {useState} from 'react';

function Object() {
  const [member, setMember] = useState({name: '홍길동', age: 23});

  const onEditInfo = () => {
    const tempObj = {...member};
    tempObj.name = '고길동';
    tempObj.age = 30;
    setMember(tempObj);
  };

  return (
    <div>
      <button onClick={onEditInfo}>변경</button>
      <h3>name : {member.name}</h3>
      <h3>age : {member.age}</h3>
    </div>
  );
}
export default Object;
