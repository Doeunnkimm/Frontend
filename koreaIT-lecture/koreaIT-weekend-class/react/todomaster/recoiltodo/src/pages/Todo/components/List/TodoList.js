import { Suspense } from 'react';
import TodoCard from './Card/Card';

function TodoList({ todoList }) {
  // const onUpdateTodo = async (id, content, state) => {
  //   try {
  //     // status === 200
  //     const { data } = await todoApi.updateTodo(id, { content, state });
  //     console.log(data.data.state);
  //     const newTodoList = [...todoList];
  //     const index = newTodoList.findIndex((todo) => todo.id === data.data.id);
  //     newTodoList[index].content = data.data.content;
  //     newTodoList[index].state = data.data.state === 0 ? false : true;
  //     setTodoList(newTodoList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const onDeleteTodo = async (id) => {
  //   if (window.confirm('정말 삭제하시겠습니까?')) {
  //     const { data } = await todoApi.deleteTodo(id);
  //     try {
  //       setTodoList(todoList.filter((todo) => todo.id !== data.data));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    // Suspense는 프로미스 형태를 리턴
    // todoList가 백엔드에서 받은 데이터가 없다면 로딩중을 보여주게 됨
    // 즉, 백엔드로부터 데이터 받아오는 시간 동안 보여주게 될 화면
    <Suspense fallback={<div>LOADING...</div>}>
      <div>
        {/* 컴포넌트를 리턴 형태로 하면 중간에 디버깅도 가능 */}
        {todoList &&
          todoList.map((todo) => {
            return (
              <TodoCard
                todo={todo}
                // onEdit={onUpdateTodo}
                // onDelete={onDeleteTodo}
              />
            );
          })}
        {/* 
        상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위해
        props(속성)을/를 이용하여 데이터를 전달
      */}
      </div>
    </Suspense>
  );
}
export default TodoList;

// fontawesome
//      npm i @fortawesome/free-solid-svg-icons
//      npm i @fortawesome/react-fontawesome
// styled-components || emotion
//      npm i styled-components
/*
css -in -js
    js 파일 안에 css을 정의 가능

    css을 모듈단위로 나누어 관리할 수 있다는 장점과
    하나의 js 파일 안에 css를 관리할 수 있다는 장점

    많은 개발자들이 사용하고 있는 이유는 유지보수가 쉽다는 점
    가독성이 굉장히 좋아짐

    따라서, reactJS와 vueJS와 같은 js 프론트엔드 프레임워크를
    사용할 경우는 scss 보다는 css -in -js를 많이 활용
 */
