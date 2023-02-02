function TodoFormModal() {
  return (
    <div>
      <form>
        <div>
          <span>ADD TODO LIST</span>
          <button>x</button>
        </div>
        <div>
          <input placeholder="제목을 입력해주세요"></input>
          <textarea placeholder="할 일 내용을 입력해주세요"></textarea>
        </div>
        <button>ADD</button>
      </form>
    </div>
  );
}
export default TodoFormModal;
