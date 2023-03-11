import { rest } from 'msw';
import { todoMock } from '__mock__/datas/todo.data';

export const addTodo = rest.post('/api/todo', async (req, res, ctx) => {
  // ctx는 데이터를 보내는 역할
  let title;
  let content;

  // req를 json 형태로 변환
  // 요청 받은 데이터는 req에 들어감
  const data = await req.json(); // 우리가 axios로 요청을 보낸 데이터가 있을 것!
  title = data.title; // 요청 받은 데이터의 title
  content = data.content; // 요청 받은 데이터의 content

  return res(
    ctx.status(200),
    ctx.json({
      id: Math.floor(Math.random() * 10000),
      title,
      content,
      state: false,
    })
  );
});
// 만들고 handlers에 등록해주면 됨!

// api/todo?todoId=3

export const getTodo = rest.get('/api/todo', (req, res, ctx) => {
  // 삭제 기능을 구현할 때는 아래와 같이 params를 이용
  // '/api/todo:id'
  // const {id} = req.params;
  return res(ctx.status(200), ctx.json(todoMock)); // 응답 보낼 내용
});
