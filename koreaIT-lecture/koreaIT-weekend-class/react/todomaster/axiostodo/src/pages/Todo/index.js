import Button from 'components/Button/Button';
import TodoFormModal from 'pages/Todo/components/Modal/TodoForm';
import styled from 'styled-components';
import {flexCenter, flexAlignCenter} from 'styles/common';
import TodoList from './components/List/TodoList';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import {Suspense, useEffect, useState} from 'react';
import todoApi from 'apis/todoApi';

export const print = () => {
  console.log('반갑습니다.');
};

function TodoPage() {
  // state
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    // useEffect 안에서는 async-await 쓸 수 없음
    // 그래서 함수를 하나 만들어서 async-await를 사용
    const getTodoList = async () => {
      const res = await todoApi.getTodo();
      setTodoList(res.data.data);
    };

    getTodoList();
  }, []);

  // toast
  const handleAddTodo = (title, content) => {
    if (!title || !content) return alert('빈칸을 채워주세요');

    return todoApi
      .addTodo({title, content})
      .then((res) => {
        if (res.status === 200) {
          setTodoList([res.data.data, ...todoList]);
        }
        setIsOpenAddTodoModal(false);
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  const showAddTodoToastMessage = (title, content) => {
    toast.promise(handleAddTodo(title, content), {
      pending: 'TODO LOADING', // 대기중일 때 메시지
      success: 'TODO SUCCESS', // 성공했을 때 메세지
      error: 'TODO ERROR', // 실패했을 때 메세지
    });
  };

  // handle
  const handleOpenTodoAddModal = () => {
    setIsOpenAddTodoModal(true);
  };

  const handleCloseTodoAddModal = () => {
    setIsOpenAddTodoModal(false);
  };

  return (
    <>
      {isOpenAddTodoModal && (
        <TodoFormModal
          showAddTodoToastMessage={showAddTodoToastMessage}
          onClose={handleCloseTodoAddModal}
        />
      )}
      <S.Wrapper>
        <S.Container>
          <S.Title>List</S.Title>
          <S.Content>
            <TodoList todoList={todoList} setTodoList={setTodoList} />
          </S.Content>
          <S.ButtonBox>
            <Button
              variant={'primary'}
              size={'full'}
              onClick={handleOpenTodoAddModal}
            >
              추가
            </Button>
          </S.ButtonBox>
        </S.Container>
        <ToastContainer autoClose={2000} theme="colored" />
      </S.Wrapper>
    </>
  );
}

export default TodoPage;

// export default 되어있는 경우 경로만 맞으면 내 마음대로 이름을 정해서 가지고 올 수 있음
// export 되어 있는 경우는 {} 구조분해할당을 통해 해당 export된 변수명 혹은 함수명 등을 이용하여 key값으로 가져옴

const Wrapper = styled.div`
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter};
`;

const Container = styled.div`
  width: 420px;
  height: 100%;
  background-color: ${({theme}) => theme.PALETTE.white};
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h1`
  background-color: ${({theme}) => theme.PALETTE.primary[300]};
  color: ${({theme}) => theme.PALETTE.fontColor};
  padding-left: 32px;
  height: 32px;
  ${flexAlignCenter};
`;

const Content = styled.div`
  width: 100%;
  height: calc(100% - 32px);
  padding-bottom: 64px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const S = {
  Wrapper,
  Container,
  Title,
  ButtonBox,
  Content,
};
