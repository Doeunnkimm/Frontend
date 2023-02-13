import TodoCard from './Card/Card';

function TodoList() {
  const TODO_LIST = [
    {
      id: 1,
      title: 'example1',
      content: 'content1',
      state: false,
      edit: false,
    },
    {
      id: 2,
      title: 'example2',
      content: 'content2',
      state: false,
      edit: false,
    },
    {
      id: 3,
      title: 'example3',
      content: 'content3',
      state: true,
      edit: false,
    },
    {
      id: 4,
      title: 'example4',
      content: 'content4',
      state: false,
      edit: false,
    },
  ];

  return (
    <div>
      {/* 컴포넌트를 리턴 형태로 하면 중간에 디버깅도 가능 */}
      {TODO_LIST.map((todo) => {
        console.log(todo);
        return <TodoCard todo={todo} />;
      })}
      {/* 
        상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달하기 위해
        props(속성)을/를 이용하여 데이터를 전달
      */}
    </div>
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
