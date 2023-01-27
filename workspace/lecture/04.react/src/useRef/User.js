import React, { useRef, useState } from 'react';
import UserList from './UserList';

function User() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
    },
  ]);

  const nextId = useRef(4);
  const usernameRef = useRef('');
  const emailRef = useRef('');

  const onCreate = () => {
    const user = {
      id: nextId.current,
      username: usernameRef.current.valueOf,
      email: emailRef.current.valueOf,
    };

    setUsers(users.concat(user));

    setInputs({
      username: '',
      email: '',
    });

    nextId.current += 1;
  };

  console.log('Render');

  return (
    <>
      <div>
        <input name="username" placeholder="계정명" ref={usernameRef} />
        <input name="email" placeholder="이메일" ref={emailRef} />
        <button onClick={onCreate}>등록</button>
      </div>
      <UserList users={users} />
    </>
  );
}

export default User;
