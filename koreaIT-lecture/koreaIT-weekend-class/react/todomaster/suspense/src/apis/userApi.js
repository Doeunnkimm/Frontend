import axiosInstance from './@core';
import wrapPromise from './@wrapPromise';

const UserApi = {
  getUser() {
    const res = axiosInstance.get('/users123').then((res) => res.data);
    return wrapPromise(res);
  },
};
export default UserApi;
