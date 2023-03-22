export const defaultHandler = () => {
  // 전역에서 사용할 에러 핸들 로직
  alert('defaultHandler');
};

// 401번 에러가 발생했다면
export const defaultErrorHandler401 = () => {
  // 전역에서 사용할 에러 핸들 로직
  alert('401에러입니다.');
};

export const defaultErrorHandler404 = () => {
  alert('404에러입니다.');
};

// 500번 에러가 발생했다면
export const defaultErrorHandler500 = () => {
  // 전역에서 사용할 에러 핸들 로직
  alert('500에러 입니다.');
};
