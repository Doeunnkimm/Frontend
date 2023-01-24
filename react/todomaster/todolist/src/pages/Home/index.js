import { Link } from 'react-router-dom';
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
    <div>
      <header>
        <div onClick={onFormChange}>LOGIN</div>
        <div onClick={onFormChange}>SIGN</div>
      </header>
      {form === 'login' ? <LoginForm /> : <SignUpForm />}
      {/* a태그로 페이지를 이동하면 페이지값을 새로 다시 요청과 응답 */}
      <a href="/todo">투두페이지로 이동</a>
      {/* Link태그를 사용하면 새로 요청X, 이미 캐싱되어 있는 걸로 */}
      <Link to="/todo">라우터로 투두페이지 이동</Link>
    </div>
  );
}

export default HomePage;
