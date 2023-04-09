interface Person {
  name: string;
  age: number;
  height?: number; // ?는 선택적으로 undefined를 부여할 수 있다
}

// Partial을 사용하면
// 모든 속성이 다 ? (어떤 속성에 대해서도 안 써도 상관 X) 붙은 것과 같음
const person: Partial<Person> = {
  name: '김성용',
  age: 20,
  // 어떤 속성을 안 적어도 문제 없음
};

const user: Person = {
  name: '김성용',
  age: 20,
};

// Omit : 특정 속성을 제외하고 가져올 수 있음
// 제외한 속성을 입력하면 error
const userWithOutAge: Omit<Person, 'age'> = {
  name: '김성용',
  height: 190,
};

// 여러 개 Omit
const userWithOut: Omit<Omit<Person, 'age'>, 'height'> = {
  name: '김성용',
};

// pick : 속성을 골라오는 것
// union type으로 여러 개도 선택적으로 가능
const userWithAge: Pick<Person, 'age' | 'height'> = {
  //   name: '김성용', // pick한 속성 이외의 속성을 작성하면 error
  age: 30,
  height: 190,
};

// ReturnType
enum TodoState {
  Todo,
  Complete,
}

type Todo = {
  id: number;
  state: TodoState;
  title: string;
  content: string;
};

export const useTodo = () => {
  const todoState: Todo[] = [
    {
      id: 3,
      state: TodoState.Todo,
      title: '안녕하세요',
      content: '123',
    },
  ];

  const handleAddTodo = () => {};
  const handleDeleteTodo = () => {};

  return {
    todoState,
    handleAddTodo,
    handleDeleteTodo,
  };
};

const todo = useTodo();

// ReturnType : useTodo가 리턴한 값을 타입으로 가지도록 해줌
// -> 알아서 타입을 만들어줌
const todoController = (todo: ReturnType<typeof useTodo>) => {
  console.log(todo.todoState); // 그래서 todo. 하면 자동완성을 지원하는 것 !
  // 비즈니스 로직...
  for (let todos of todo.todoState) {
    if (todos.state === TodoState.Complete) {
      // ...
    }
  }
};

todoController(todo);
