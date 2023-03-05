const Comment = ({ comment }) => (
  <div
    style={{
      border: "1px solid #000",
    }}
  >
    <h6>{comment.User.nickName}</h6>
    <p>{comment.content}</p>
    {comment.myComment && <button type="button">삭제</button>}
  </div>
);
export default Comment;
