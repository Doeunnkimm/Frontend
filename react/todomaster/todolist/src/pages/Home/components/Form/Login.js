function LoginForm() {
  return (
    <form>
      <div>
        <input placeholder="e-mail" />
        <span>이메일</span>
      </div>
      <div>
        <input type="password" placeholder="password" />
        <span>비밀번호</span>
      </div>
      <button>로그인</button>
    </form>
  );
}
export default LoginForm;
