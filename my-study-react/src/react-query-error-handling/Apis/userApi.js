import axiosInstance from './@core';

const UserApi = {
  getUser() {
    // 에러 상황 테스트를 위해 일부로 존재하지 않는 주소로 요청
    return axiosInstance.get('/users2343');
  },
};
export default UserApi;
