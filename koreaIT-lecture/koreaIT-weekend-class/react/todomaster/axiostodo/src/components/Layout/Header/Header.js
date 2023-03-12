import AuthApi from 'apis/authApi';
import { Axios } from 'apis/core';
import { useAuth } from 'contexts/auth';

function BasicHeader() {
  const auth = useAuth();

  const onLogout = async () => {
    await AuthApi.logout(); // 로그아웃 버튼을 누르면 session에 있는 refresh까지 반납을 해야지 로그아웃을 하고나서는 재요청하는 경우가 없도록 해야한다
    auth.logout();
  };

  const onRefresh = async () => {
    const res = await Axios.post(`/user/jwt`);
    console.log(res.data.data);
  };

  return (
    <>
      HEADER
      <button onClick={onRefresh}>리프레시</button>
      <button onClick={onLogout}>
        {/* auth에 accessToken이 있다면 */}
        {auth.accessToken ? '로그아웃' : '로그인'}
      </button>
    </>
  );
}
export default BasicHeader;
