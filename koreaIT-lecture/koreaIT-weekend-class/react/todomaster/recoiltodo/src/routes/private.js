import { useAuth } from 'contexts/auth';
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import TokenService from 'repository/TokenService';

function PrivateRoute() {
  const access_token = TokenService.getToken();
  const auth = useAuth();
  const navigate = useNavigate();
  const { pathName } = useLocation();
  /*

    useLocation()

    navigate를 통해 전달된 state 객체를 전달받을 수 있고
    현재 주소의 url을 가지고 올 수 있음
    {
        pathName: '/todo',
        state: {
            from: pathName
        }
    }

  */

  useEffect(() => {
    // 로그인 하거나 로그아웃을 했을 때마다
    if (!auth.accessToken) {
      // 토큰이 없다면
      navigate('/', {
        // 메인 페이지로 이동하는데 다음과 같은 값을 함께 보낸다
        state: {
          // 전달하고 싶은 데이터를 state를 통해 전달한다
          from: pathName, // '/'로 이동했을 때 이전 페이지 주소가 될 것임
        },
        // navigate로 이동될 페이지에 데이터 전달
        // params로 전달하는 방법도 있으나 그럴 필요가 없는 데이터
        // 상품 번호와 같은 데이터는 필요! 해당 데이터로 백엔드에 요청하고 결과겂이 달라지니까
      });
    }
  }, [auth]);

  return access_token ? <Outlet /> : <Navigate to={'/'} />;
}
export default PrivateRoute;

/*
    Outlet은 자식 라우터들 중에서
    지금 주소랑 일치한 자식 라우터를 가져오는 역할
*/

/*
    Navigate는 useNavigate와의 차이점은 컴포넌트 형태로 사용할 수 있다는 점이다
*/
