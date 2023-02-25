import Button from 'components/Button/Button';
import useInputs from 'hooks/useInputs';
import {useEffect, useState} from 'react';
import * as S from '../style';

function SignUpForm({setForm}) {
  const [isPasswordConfirm, setPasswordIsConfirm] = useState(false);
  const [{email, password, passwordConfirm}, onChangeForm] = useInputs({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  /*
    과제

      모든 필드가 채워지지 않으면 button의 disabled는 true
        심화. 특정 필드를 지정 후 해당 필드가 채워지지 않으면 disabled는 false
              특정 필드는 유동적일 수 있다.

      email의 이메일 양식이 갖춰지지 않으면 disabled는 true
      비밀번호가 8글자 이상이지 않으면 disabled는 true

      위의 유효성 검사 과정을 커스텀 훅(선택)으로 만들어보세요
      위의 유효성은 로그인 페이지에도 재사용됩니다.
  */

  useEffect(() => {
    if (password !== passwordConfirm) {
      return setPasswordIsConfirm(false);
    }
    return setPasswordIsConfirm(true);
  }, [password, passwordConfirm]); // password와 passwordConfirm이 바귈 때마다 확인함

  const handelSignupSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('정보를 입력해주세요');
    if (!isPasswordConfirm) return alert('비밀번호 확인이 일치하지 않습니다');
    setForm('login');
  };

  return (
    <S.Form>
      <S.InputBox>
        <input placeholder="e-mail" name={'email'} onChange={onChangeForm} />
        <span>이메일</span>
      </S.InputBox>
      <S.InputBox>
        <input
          type="password"
          placeholder="password"
          name={'password'}
          onChange={onChangeForm}
        />
        <span>비밀번호</span>
      </S.InputBox>
      <S.InputBox>
        <input
          type="password"
          placeholder="password confirm"
          name={'passwordConfirm'}
          onChange={onChangeForm}
        />
        <span>비밀번호 확인</span>
      </S.InputBox>
      <S.Error visible={!isPasswordConfirm}>
        비밀번호 확인이 일치하지 않습니다
      </S.Error>
      <Button
        variant={'primary'}
        size={'full'}
        disabled={!isPasswordConfirm}
        onClick={handelSignupSubmit}
      >
        회원가입
      </Button>
    </S.Form>
  );
}
export default SignUpForm;
