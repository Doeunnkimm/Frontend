import axios from 'axios';
import Button from 'components/Button/Button';
import useInputs from 'hooks/useInputs';
import {useEffect, useState} from 'react';
import * as S from '../style';

function SignUpForm({setForm}) {
  const [{email, password, passwordConfirm}, onChangeForm] = useInputs({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    if (password !== passwordConfirm) {
      return setError('비밀번호 확인이 일치하지 않습니다');
    }
    setError('');
  }, [password, passwordConfirm]); // password와 passwordConfirm이 바귈 때마다 확인함

  const handelSignupSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert('정보를 입력해주세요');
    if (password !== passwordConfirm)
      return alert('비밀번호 확인이 일치하지 않습니다');

    try {
      const res = await axios.post('http://localhost:9000/user/sign', {
        email,
        password,
      });
      // 위 axios 코드에서 에러가 나면 아래 코드들은 실행하지 않고 바로 catch문으로 넘어가버림
      // 즉, 이 아래 코드들은 axios 코드가 성공적으로 실행되었을 때만 실행됨
      if (!alert(res.data.data)) {
        setForm('login');
      }
    } catch (err) {
      setError(err.response.data.error);
      console.log(err);
      // 상위 try-catch문으로 에러를 던짐
      // 없다면 가장 상위에 있는 윈도우가 에러를 처리 -> 윈도우가 에러를 처리하는 방법: 콘솔찍기
      // throw new Error(err); // console.error(err);
    }
  };

  useEffect(() => {
    setError('');
  }, [email]);

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
      <S.Error visible={error}>{error}</S.Error>
      <Button
        variant={'primary'}
        size={'full'}
        disabled={error || !email || !password}
        onClick={handelSignupSubmit}
      >
        회원가입
      </Button>
    </S.Form>
  );
}
export default SignUpForm;
