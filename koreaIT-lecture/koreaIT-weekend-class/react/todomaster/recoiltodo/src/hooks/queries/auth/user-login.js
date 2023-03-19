import AuthApi from 'apis/authApi';
import { useAuth } from 'contexts/auth';
import { useMutation } from '@tanstack/react-query';

const useUserLogin = () => {
  const auth = useAuth();

  // 요청에 body가 실리는 경우에는 useMutation을 사용
  // 여기서 data는 body에 담고 싶은 내용
  return useMutation(({ email, password }) => AuthApi.login(email, password), {
    onSuccess: (res) => {
      auth.login(res.data.token);
    },
    //   onError
    onError: (err) => {
      console.log(err);
    },
    //   onSettled
  });
};
export default useUserLogin;
