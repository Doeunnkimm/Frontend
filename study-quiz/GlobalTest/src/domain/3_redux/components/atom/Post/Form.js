const PostForm = ({ onSubmit }) => {
  return (
    <>
      <h2>POST-FORM</h2>
      <form onSubmit={onSubmit}>
        <label>
          <input type="text" name="title" placeholder="제목" />
        </label>
        <label>
          <input type="text" name="content" placeholder="내용" />
        </label>
        <button type="submit">추가</button>
      </form>
    </>
  );
};
export default PostForm;
