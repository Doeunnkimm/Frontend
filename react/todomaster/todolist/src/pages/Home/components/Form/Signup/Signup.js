import Button from 'components/Button/Button';
import * as S from '../style';

function SignUpForm() {
  return (
    <S.Form>
      <S.InputBox>
        <input placeholder="e-mail" />
        <span>이메일</span>
      </S.InputBox>
      <S.InputBox>
        <input type="password" placeholder="password" />
        <span>비밀번호</span>
      </S.InputBox>
      <div>
        <input type="password" placeholder="password confirm" />
        <span>비밀번호 확인</span>
      </div>
      <Button variant={'primary'} size={'full'}>
        회원가입
      </Button>
    </S.Form>
  );
}
export default SignUpForm;
