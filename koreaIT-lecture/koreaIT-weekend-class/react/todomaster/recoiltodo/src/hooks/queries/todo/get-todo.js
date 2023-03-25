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
      suspense: true, // true로 해야 app.js에서 설정한 Suspense 사용 가능
      // 이 쿼리를 사용하는 밖에 컴포넌트 밖에 Suspense로 감싸면 된다
      // 성공 결과도 위로 throw 하게 되는데
      // Suspense 입장에서도 성공된 결과를 throw 못 받으니까...
      // 쿼리가 요청이 올 때까지 무한 요청을 보내게 됨
      // Suspense 설정해두고 안 쓰려면
      // ---> 응답값이 업을 때를 return null 설정을 해주거나 해야함...
    }
  );

  return { data, error, status, isLoading };
};
export default useGetTodo;
