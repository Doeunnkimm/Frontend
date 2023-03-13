import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onChangeInput = (e) => {
    if (e.target.name === 'title') setTitle(e.target.value);
    if (e.target.name === 'content') setContent(e.target.value);
  };

  const onClickSubmit = () => {
    navigate('/submit', {
      state: {
        title,
        content,
      },
    });
  };

  return (
    <div>
      <h2>제목</h2>
      <input name="title" onChange={onChangeInput} />
      <h2>내용</h2>
      <input name="content" onChange={onChangeInput} />
      <div>
        <button onClick={onClickSubmit}>바로 전송하기</button>
      </div>
    </div>
  );
}
export default Home;
