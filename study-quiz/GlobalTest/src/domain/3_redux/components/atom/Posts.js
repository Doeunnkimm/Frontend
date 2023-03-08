import { useSelector } from 'react-redux';
import Post from './Post/Post';

const AllPosts = () => {
  const posts = useSelector((state) => state.postReducer);
  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
export default AllPosts;
