import { useQuery } from '@tanstack/react-query';
import TodoApi from 'apis/todoApi';
import { QUERY_KEY } from 'consts/query-key';

const useGetTodo = (params) => {
  const { data, error, status, isLoading } = useQuery(
    [QUERY_KEY.GET_TODO],
    () => TodoApi.getTodo(params),
    {
      refetchOnWindowFocus: false,
      retry: 1, // 실패하면 다시 요청 1번
      cacheTime: 1000 * 5 * 60,
      onSuccess: () => {},
      onError: () => {},
      //   suspense: true, // true로 해야 app.js에서 설정한 Suspense 사용 가능
    }
  );

  return { data, error, status, isLoading };
};
export default useGetTodo;
