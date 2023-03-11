import { useAuth } from 'contexts/auth';

function BasicHeader() {
  const auth = useAuth();

  const onLogout = () => {
    auth.logout();
  };

  return (
    <>
      HEADER
      <button onClick={onLogout}>
        {/* auth에 accessToken이 있다면 */}
        {auth.accessToken ? '로그아웃' : '로그인'}
      </button>
    </>
  );
}
export default BasicHeader;
