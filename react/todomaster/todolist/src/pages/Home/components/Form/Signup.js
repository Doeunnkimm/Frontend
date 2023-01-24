function SignUpForm() {
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
      <div>
        <input type="password" placeholder="password confirm" />
        <span>비밀번호 확인</span>
      </div>
      <button>회원가입</button>
    </form>
  );
}
export default SignUpForm;
