const CommentForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <label>
        <input type="text" name="name" placeholder="이름" />
      </label>
      <label>
        <input type="text" name="content" placeholder="내용" />
      </label>
      <button type="submit">추가</button>
    </form>
  );
};
export default CommentForm;
