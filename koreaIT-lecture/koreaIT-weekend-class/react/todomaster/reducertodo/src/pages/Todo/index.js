import Button from 'components/Button/Button';
import TodoFormModal from 'pages/Todo/components/Modal/TodoForm';
import styled from 'styled-components';
import {flexCenter, flexAlignCenter} from 'styles/common';
import TodoList from './components/List/TodoList';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import {useReducer, useState} from 'react';
import {ADD_TODO, useTodoDispatch} from 'contexts/todo';

export const print = () => {
  console.log('반갑습니다.');
};

function TodoPage() {
  // state
  const [isOpenAddTodoModal, setIsOpenAddTodoModal] = useState(false);
  const dispatch = useTodoDispatch();

  // toast
  const handleAddTodo = (title, content) => {
    return new Promise((resolve, reject) => {
      if (!title || !content) {
        reject('내용을 모두 입력해주세요');
      }

      setTimeout(() => {
        const newTodo = {
          id: Math.floor(Math.random() * 100000),
          state: false,
          title,
          content,
        };
        resolve(newTodo);
      }, 1000);
    }).then((res) => {
      // res에는 새로 추가할 데이터가 담겨있음
      dispatch(ADD_TODO(res));
      setIsOpenAddTodoModal(false);
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
            <TodoList />
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
