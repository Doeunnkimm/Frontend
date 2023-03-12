import { Axios } from 'apis/core';
import { useAuth } from 'contexts/auth';

function BasicHeader() {
  const auth = useAuth();

  const onLogout = () => {
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
