import { useEffect } from 'react';
import { useState } from 'react';
import Posts from './Posts';

function User({ userId }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then((user) => {
        setTimeout(() => {
          setUser(user);
          setLoading(false);
        }, 3000);
      });
  }, []);

  if (loading) return <p style={{ color: 'red' }}>사용자 정보 로딩중...</p>;
  return (
    <div>
      <p>{user.name}님이 작성한 글</p>
      <Posts userId={userId} />
    </div>
  );
}
export default User;
