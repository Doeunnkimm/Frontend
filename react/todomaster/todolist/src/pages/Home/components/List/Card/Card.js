function TodoCard(props) {
  // props의 데이터가 적을 때는 매개변수에 구조분해 할당
  // props의 데이터가 많다면 컴포넌트 안에서 구조분해 할당 변수/상수 선언
  const { todo } = props;
  const { state, title, content } = todo;
  return (
    <div>
      {state ? '완료' : '미완료'}
      <h2>{title}</h2>
      <div>{content}</div>
    </div>
  );
}

export default TodoCard;
