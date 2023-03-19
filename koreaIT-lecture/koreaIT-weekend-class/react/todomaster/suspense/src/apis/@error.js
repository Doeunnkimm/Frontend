class ApiCustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;

    if (status === 403) {
      // 로그아웃 로직
      window.location.href = '/';
      this.message = '세션이 만료되었습니다';
    }

    if (status === 404) {
      // 404 페이지로 이동하는 로직
      this.message = '존재하지 않는 페이지입니다.';
    }

    // ...
  }
}
export default ApiCustomError;
