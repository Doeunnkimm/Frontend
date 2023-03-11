import axios from 'axios';
import { useAuth } from 'contexts/auth';
import TokenService from 'repository/TokenService';

export const Axios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // 프론트 웹 스토리지의 쿠키를 백엔드 개발자가 공유 가능
  // headers: {
  //   Authorization: `Bearer ${TokenService.getToken()}`,
  // },
});

/*
  request | response interceptor

    요청 메세지를 http request message
    응답 메세지를 http response message
    
    이 요청이 서버에 도착하기 전에, 이 응답이 브라우저에 도착하기 전에
    가로채서 특별한 작업을 하고 다시 비즈니스 로직에 전달할 수가 있음
*/

Axios.interceptors.request.use(
  // 요청이 서버에 도착하기 전에

  // 에러가 없다면
  (config) => {
    const access_token = TokenService.getToken();
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
      return config;
    }
    return config;
  },

  // 에러가 생기면
  (error) => {
    return Promise.reject(error);
  }
);

/*
  refresh token
*/
Axios.interceptors.response.use(
  // 에러가 없다면
  (res) => {
    // 성공했으면 그냥 그대로 통과
    return res;
  },

  // 에러가 생기면 <- 즉 토큰이 만료되었다고 왔다면
  // 전역에서 token을 관리하면서 에러가 오면 alert 창 띄우고 전역 로그인 로직에서 logout 시키고 이런 것들도 가능
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // 재요청일 경우에도 에러가 나오면 다시 또 요청을 보내지 않음
      // 401 에러이고  _retry라는 옵션이 false이면
      originalRequest._retry = true; // 재요청 보낸다는 의미

      /*
      * refresh 토큰을 보내서 일반 token을 재발급
      const res = 백엔드에서 refresh token으로 access_token을 응답받는 주소
            axios.post('/jwtReFresh')

      (1) refreshToken이 쿠키로 관리되고 있다면 쿠키값을 공유할 수 있음
          보낼 필요가 없다. 백엔드와 프론트엔드 쿠키값을 공유할 수 있음
          withCredentials: true

      (2) 로컬스토리지, 세션스토리지, 웹쿠키(공유하지 않는다는 전제)
          axios.post('/jwtReFresh', {
            refresh_token: RefreshTokenService.getToken();
          })

          ===> access_token이 전달될 것임!
          const accessToken = res.data.token
          TokenService.setToken(accessToken);
          // 화면을 리렌더링할 필요가 없기 때문에 그냥 setToken으로 넣어줌

          Axios.defaults.headers.common['Authorization] = `Bearer ${accessToken}
            return Axios(originalRequest); // 이순간 재전송됨

          *** 프론트에서 요청을 보냈는데 서버에서 토큰이 만료되었다고 에러를 보냄
          -> 그 에러를 중간에 가로채서 refresh 토큰으로 token을 재발급 받고 그 token을 가지고 다시 요청을 보냄
          -> 사용자는 모르게 가로채서 다시 요청을 보내는 것
      */
    }
    return Promise.reject(error);
  }
);
