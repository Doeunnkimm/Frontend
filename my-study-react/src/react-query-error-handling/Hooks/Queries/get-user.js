import { useQuery } from 'react-query';
import UserApi from '../../Apis/userApi';
import useApiError from '../useApiError';

const detailErrorHandler401 = () => {
  alert('개별 컴포넌트에서 재정의한 401에러 핸들러');
};

const detailErrorHandler404 = () => {
  alert('개별 컴포넌트에서 재정의한 404에러 핸들러');
};

const detailErrorHandler500 = () => {
  alert('개별 컴포넌트에서 재정의한 500에러 핸들러');
};

// 개별 컴포넌트에서 에러를 핸들링하려면 onError에 핸들러를 적어준다
const useGetUser = () => {
  const { handleError } = useApiError({
    401: {
      default: detailErrorHandler401,
    },
    404: {
      default: detailErrorHandler404,
    },
    500: {
      default: detailErrorHandler500,
    },
  });

  const getUser = async () => {
    const res = await UserApi.getUser();
    return res;
  };

  const { data, error, status, isLoading } = useQuery('key', getUser, {
    refetchWindowFocus: false,
    retry: 1,
    onSuccess: () => {},
    onError: handleError,
  });

  return { data, error, status, isLoading };
};
export default useGetUser;
