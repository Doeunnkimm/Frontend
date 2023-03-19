import { useMutation, useQueryClient } from '@tanstack/react-query';
import TodoApi from 'apis/todoApi';
import { addModalAtom } from 'atoms/ui.atom';
import { QUERY_KEY } from 'consts/query-key';
import { useSetRecoilState } from 'recoil';

const useAddTodo = () => {
  const setAddModal = useSetRecoilState(addModalAtom);
  const queryClient = useQueryClient();

  return useMutation((todo) => TodoApi.addTodo(todo), {
    onSuccess: () => {
      // addTodo 해서 성공하게 되면
      // queryClient에서 Query key의 get_todo를 유효하지 않게 한다
      // ==> 새로운 요청을 보낼 수 있도록 하는 것

      // 참고로 invalid 상태가 아니면 재요청 하지 않음
      // 재요청하고 싶은 쿼리의 키값을 정확하게 입력해야 함
      queryClient.invalidateQueries(QUERY_KEY.GET_TODO);
      setAddModal(false);
    },
  });
};
export default useAddTodo;
