import Post from "./Post/Post";

const AllPosts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
export default AllPosts;
