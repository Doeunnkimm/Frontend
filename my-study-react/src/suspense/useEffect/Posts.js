import { useEffect, useState } from 'react';

function Posts({ userId }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then((posts) => {
        setTimeout(() => {
          setPosts(posts);
          setLoading(false);
        }, 3000);
      });
  }, []);

  if (loading) return <p style={{ color: 'red' }}>글목록 로딩중...</p>;
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.id}. {post.title}
        </li>
      ))}
    </ul>
  );
}
export default Posts;
