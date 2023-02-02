import TodoList from '../Home/components/List/TodoList';

export const print = () => {
  console.log('반갑습니다.');
};

export function TodoPage() {
  return (
    <div>
      <div>List</div>
      <div>
        <TodoList />
      </div>
      <div>
        <button>추가</button>
      </div>
    </div>
  );
}

// export default 되어있는 경우 경로만 맞으면 내 마음대로 이름을 정해서 가지고 올 수 있음
// export 되어 있는 경우는 {} 구조분해할당을 통해 해당 export된 변수명 혹은 함수명 등을 이용하여 key값으로 가져옴
