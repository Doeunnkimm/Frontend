import {useState} from 'react';

function Array() {
  const [member, setMember] = useState([
    {name: '이병건', age: 23, gender: 'M'},
  ]);

  const addMember = () => {
    let tempArray = member.concat({name: '주호민', age: 24, gender: 'M'});
    setMember(tempArray);
  };

  const deleteMember = () => {
    let tempArray = Array.from(member);
    tempArray.splice(0, 1);
    setMember(tempArray);
  };

  return <div>{member}</div>;
}
export default Array;
