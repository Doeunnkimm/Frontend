import { useMutation, useQueryClient } from '@tanstack/react-query';
import TodoApi from 'apis/todoApi';
import { QUERY_KEY } from 'consts/query-key';

const useUpdateTodo = () => {
  const client = useQueryClient();

  return useMutation(({ id, data }) => TodoApi.updateTodo(id, data), {
    // 낙관적 업데이트 : 업데이트 후에 수정사항을 요청 보내게 됨
    // ---> 캐시를 업데이트 하기 위해 서버 응답을 기다릴 필요가 없다
    onSuccess: (res) => {
      // res에는 새로 업데이트된 데이터 정보가 들어있을 것임

      // 어차피 업데이트될 데이터이니까 화면에서는 미리 수정된 데이터를 setState
      // ---> 사용자는 미리 setState된 데이터를 미리 볼 수 있게 됨
      // 보여주는 것을 먼저 하고 그 뒤에 서버에게 요청하는 것

      // 낙관적 업데이트를 덮어쓰지 않기 위해 쿼리를 수동으로 삭제한다.
      // 저장되어 있는 캐싱 데이터 삭제할 뿐 재요청 X, **캐싱되어 있는 값을 삭제**
      client.cancelQueries([QUERY_KEY.GET_TODO]);

      // 지워진 공간에 낙관적으로 성공할 결과값을 다시 세팅 해줌
      client.setQueryData([QUERY_KEY.GET_TODO], (oldData) => {
        // 데이터를 내마음대로 변경할거다 <- key값으로 setState하는 느낌
        let updateData = oldData.data.data.find(
          // res에는 새로 업데이트한 데이터의 정보가 담겨있으므로
          // 그 데이터를 가지고 기존 데이터에서 target을 찾는것
          (data) => data.id === res.data.data.id
        );
        updateData.content = res.data.data.content;
        updateData.state = res.data.data.state;
        return oldData; // target을 수정한 데이터를 리턴한다
      });
    },
  });
};
export default useUpdateTodo;

/*
        update 성공 => 데이터 변경 => 요청을 새로해야 함, 하지만 우리는 이미 결과값을 알고 있기 때문에
                                                            재요청하지 않아도 데이터를 수정할 수 있음

        ==> 서버에게 요청 보내서 실제 데이터베이스에 있는 데이터를 수정해달라고 요청은 보내고,
            화면에 보이는 get-todo에 대해서는 프론트에서 setState 해주게 됨
*/
