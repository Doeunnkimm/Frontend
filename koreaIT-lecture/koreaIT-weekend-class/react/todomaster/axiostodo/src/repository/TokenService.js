const TOKEN_KEY = 'access_token';

const TokenService = {
  // set
  setToken(value) {
    localStorage.setItem(TOKEN_KEY, value);
  },
  // get
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  // remove
  removeToken(value) {
    localStorage.removeItem(TOKEN_KEY);
  },
};
export default TokenService;
