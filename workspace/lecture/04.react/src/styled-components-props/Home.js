import {useState} from 'react';
import styled from 'styled-components';

function HomePage() {
  const [form, setForm] = useState('');

  const onClickForm = (e) => {
    const {innerText} = e.target;
    setForm(innerText);
  };

  return (
    <div>
      <LoginSelector mode={form} onClick={onClickForm}>
        로그인
      </LoginSelector>
      <SignSelector mode={form} onClick={onClickForm}>
        회원가입
      </SignSelector>
      <div>{form}</div>
    </div>
  );
}

export default HomePage;

const LoginSelector = styled.button`
  background-color: ${({mode}) =>
    mode === '로그인' ? 'blanchedalmond' : 'gray'};
`;

const SignSelector = styled.button`
  background-color: ${({mode}) =>
    mode === '회원가입' ? 'aquamarine' : 'gray'};
`;
