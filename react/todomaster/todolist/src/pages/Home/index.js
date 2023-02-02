import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { flexCenter } from '../../styles/common';
import LoginForm from './components/Form/Login';
import SignUpForm from './components/Form/Signup';

function HomePage() {
  let form = 'login';

  const onFormChange = (e) => {
    const { innerText } = e.target;
    form = innerText.toLowerCase();
    console.log(form);
  };

  return (
    <Wrapper>
      <Header>
        <div onClick={onFormChange}>LOGIN</div>
        <div onClick={onFormChange}>SIGN</div>
      </Header>
      {form === 'login' ? <LoginForm /> : <SignUpForm />}
      {/* a태그로 페이지를 이동하면 페이지값을 새로 다시 요청과 응답 */}
      <a href="/todo">투두페이지로 이동</a>
      {/* Link태그를 사용하면 새로 요청X, 이미 캐싱되어 있는 걸로 */}
      <Link to="/todo">라우터로 투두페이지 이동</Link>
    </Wrapper>
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
  background-color: ${({ theme }) => theme.PALETTE.primary[300]};
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
