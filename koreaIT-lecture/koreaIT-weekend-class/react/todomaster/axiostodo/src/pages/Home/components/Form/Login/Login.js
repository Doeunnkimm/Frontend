import AuthApi from 'apis/authApi';
import axios from 'axios';
import { Button } from 'components/Button/style';
import { useAuth } from 'contexts/auth';
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

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await AuthApi.login(email, password);
      auth.login(data.token);
      // token == access_token
      // token 값을 저장할 것, token 값이 있다면 로그인이 된 것
      // 프론트엔드의 로그인 유무 판단
      // --> 로그인 했을 때 접속할 수 있는 페이지, 관리자만 접속할 수 있는 페이지 활용 가능

      /*
          1. 웹 스토리지(로컬, 세션 스토리지)
          2. state (redux-persist 사용하면 새로고침 시 안 사라지게 할 수 있음)
          3. refreshToken
                access_token은 어디에 저장하든 탈취 위험
                따라서 access_token이 탈취되어도 이 토큰에 기간을 설정해서
                해커한테 제어권이 넘어가는 시간을 최소화

                access_token 만료 => 사용자는 접근 권한 소멸 => 프론트엔드 로그아웃 처리 해야 함
                => 사용자가 불편

                ==> 요청할 때 access_token  ==> refresh token(만료기간: 7주~14주)도 쿠키에 같이 보냄
                ==> access_token이 만료되면 프론트엔드는 access_token을 재발급
                ==> 세션이 만료되었다는 에러가 오면 그 응답을 가로채서 다시 http request에 실어서 재요청
      */
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
