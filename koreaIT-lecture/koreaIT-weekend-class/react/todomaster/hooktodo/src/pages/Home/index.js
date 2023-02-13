import {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {flexCenter} from '../../styles/common';
import LoginForm from './components/Form/Login/Login';
import SignUpForm from './components/Form/Signup/Signup';

function HomePage() {
  const [form, setForm] = useState('login');

  const onFormChange = (e) => {
    const {innerText} = e.target;
    setForm(innerText.toLowerCase());
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.LoginSelector mode={form} onClick={onFormChange}>
          LOGIN
        </S.LoginSelector>
        <S.SignSelector mode={form} onClick={onFormChange}>
          SIGN
        </S.SignSelector>
      </S.Header>
      {form === 'login' ? <LoginForm /> : <SignUpForm />}
      {/* a태그로 페이지를 이동하면 페이지값을 새로 다시 요청과 응답 */}
      {/* <a href="/todo">투두페이지로 이동</a>
      Link태그를 사용하면 새로 요청X, 이미 캐싱되어 있는 걸로
      <Link to="/todo">라우터로 투두페이지 이동</Link> */}
    </S.Wrapper>
  );
}

export default HomePage;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
  flex-direction: column;
`;

const Header = styled.header`
  /* 테마 프로바이더로 전달을 하면 매번 import하지 않아도 사용 가능 */
  background-color: ${({theme}) => theme.PALETTE.primary[300]};
  width: 360px;
  height: 48px;
  position: relative;
  display: flex;

  & > div {
    height: 100%;
    width: 50%;
    ${flexCenter};
    cursor: pointer;
    :hover {
      background-color: #e0e0e0;
    }
  }
`;

const LoginSelector = styled.div`
  background-color: ${({mode}) => (mode === 'login' ? '#e0e0e0' : '#f5f5f5')};
`;
const SignSelector = styled.div`
  background-color: ${({mode}) => (mode === 'sign' ? '#e0e0e0' : '#f5f5f5')};
`;

// 만든 스타일 컴포넌트를 객체화
// 사용할 때 S. 으로 접근 및 표시하여
// 일반 컴포넌트와 스타일 컴포넌트를 명확하게 차이를 둠
const S = {
  Wrapper,
  Header,
  LoginSelector,
  SignSelector,
};
