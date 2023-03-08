import { useRef } from 'react';

const PostForm = ({ onSubmit }) => {
  const title = useRef();
  const content = useRef();

  const onSubmitPost = (e) => {
    e.preventDefault();
    onSubmit(title.current.value, content.current.value);
    title.current.value = '';
    content.current.value = '';
  };

  return (
    <>
      <h2>POST-FORM</h2>
      <form onSubmit={onSubmitPost}>
        <label>
          <input type="text" name="title" placeholder="제목" ref={title} />
        </label>
        <label>
          <input type="text" name="content" placeholder="내용" ref={content} />
        </label>
        <button type="submit">추가</button>
      </form>
    </>
  );
};
export default PostForm;
