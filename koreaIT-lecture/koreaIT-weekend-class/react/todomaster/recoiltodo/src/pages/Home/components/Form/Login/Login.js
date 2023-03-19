import AuthApi from 'apis/authApi';
import axios from 'axios';
import { Button } from 'components/Button/style';
import { useAuth } from 'contexts/auth';
import useUserLogin from 'hooks/queries/auth/user-login';
import useInput from 'hooks/useInput';
import useInputs from 'hooks/useInputs';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TokenService from 'repository/TokenService';
import * as S from '../style';

function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { state } = useLocation();

  const [{ email, password }, onChangeForm] = useInputs({
    email: '',
    password: '',
  });

  // mutation
  const { mutate } = useUserLogin();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ email, password });
    } catch (err) {
      console.error(err);
      alert('아이디와 비밀번호를 확인해주세요');
    }
  };

  /* access_token이 있다면 페이지 접근을 막고 메인 페이지로 이동 */
  useEffect(() => {
    // 로그인하거나 로그아웃 했을 때

    // auth는 전역에서 관리되고 있기 때문에
    // 혹시 어디에선가 token이 없어지게 되더라도
    // 로그인이 풀렸다는 말이므로
    // 아래 코드를 실행시키지 않는다
    if (!auth.accessToken) return;

    // 로그인이 된 이후
    if (!state) return navigate('/todo'); // 이전 페이지가 없다면 로그인 하면 그냥 '/todo'로 보낸다
    navigate(state.from);
  }, [auth]);

  useEffect(() => {
    // 이미 access_token이 있는 로그인 페이지로 온다면
    // 그냥 '/todo' 페이지로 보냄
    if (auth.access_token) return navigate('/todo');
  }, []);

  return (
    <S.Form>
      <S.InputBox>
        <input placeholder="e-mail" name="email" onChange={onChangeForm} />
        <span>이메일</span>
      </S.InputBox>
      <S.InputBox>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={onChangeForm}
        />
        <span>비밀번호</span>
      </S.InputBox>
      <Button variant={'primary'} size={'full'} onClick={onLoginSubmit}>
        로그인
      </Button>
    </S.Form>
  );
}
export default LoginForm;
