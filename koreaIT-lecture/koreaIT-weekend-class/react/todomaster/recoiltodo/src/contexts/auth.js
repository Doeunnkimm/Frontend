import TokenService from 'repository/TokenService';

const { createContext, useState, useContext, useEffect } = require('react');

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
  // state이기 때문에 새로고침을 하면 초기화가 됨
  const [accessToken, setAccessToken] = useState(TokenService.getToken());

  //  새로고침을 하더라도 웹 스토리지에는 토큰이 남아있음
  // 그래서 그게 있으면 다시 state를 set 한다
  // 아래 방법이 안정성이 있지만 깜빡거림 있음
  //   useEffect(() => {
  //     const token = TokenService.getToken();
  //     if (token) {
  //       setAccessToken(token);
  //     }
  //   });

  const login = (token) => {
    TokenService.setToken(token);
    setAccessToken(token);
  };

  const logout = () => {
    TokenService.removeToken();
    setAccessToken(null);
  };

  return (
    // 함수도 전역 상태 관리 값으로 보낼 수 있음
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
