import IMG_LOGO from './images/facebook-logo.svg';

export default function Home(props) {
  return (
    <div className="login-layer">
      <div className="logo-box">
        <img src={IMG_LOGO} alt="" />
        <h2>
          Facebook에서 전세계에 있는 친구, 가족, 지인들과 함께 이야기를
          나눠보세요.
        </h2>
      </div>
      <div className="login-box">
        <div>
          <div>
            <input
              className="input-email"
              type="text"
              name="email"
              placeholder="이메일 또는 전화번호"
            />
          </div>
          <div>
            <input
              type="password"
              className="input-pass"
              placeholder="비밀번호"
            />
          </div>

          <button
            className="login-button"
            onClick={() => (window.location.href = '/')}
          >
            로그인
          </button>
          <a onClick={() => (window.locaiton.href = '/identify')}>
            비밀번호를 잊으셨나요?
          </a>
          <div className="div-line"></div>
          <div>
            <span
              className="regist"
              onClick={() => (window.location.href = '/regist')}
            >
              새계정 만들기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
