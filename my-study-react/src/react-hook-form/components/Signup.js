import styled from 'styled-components';

import {useForm} from 'react-hook-form';
import {useRef} from 'react';

const Regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function SignupPage() {
  const {
    register,
    watch,
    formState: {errors},
    handleSubmit,
  } = useForm();
  console.log(watch('email')); // 감시를 할 input의 name을 전달

  const password = useRef();
  password.current = watch('password');

  const onSubmit = (data) => {
    console.log('data', data); // 데이터가 객체 형태로 받아와짐
    /*
        받은 data를 이용해서 backend에게 전달 하는 등의 기능으로 연결
    */
  };

  return (
    <S.Wrapper>
      <S.Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.Label>Email</S.Label>
          <S.Input
            type="email"
            autoComplete="off"
            {...register('email', {
              required: {value: true, message: '이메일을 입력해주세요'},
              pattern: {
                value: Regex,
                message: '이메일 형식에 맞게 입력해주세요',
              },
            })}
          />
          {/* 
              register 기능을 호출해서 입력을 등록, 추가적인 제약조건도 작성 가능
              required : 무조건 값이 들어와야 함
              pattern : 입력받을 값이 지켜야 할 패턴
          */}
          {errors.email && <S.P>{errors.email.message}</S.P>}

          <S.Label>Name</S.Label>
          <S.Input
            type="text"
            {...register('name', {
              required: {value: true, message: '이름을 반드시 입력해주세요'},
              maxLength: {value: 10, message: '10자 이내로 작성해주세요'},
            })}
          />
          {errors.name && <S.P>{errors.name.message}</S.P>}

          <S.Label>Password</S.Label>
          <S.Input
            type="password"
            {...register('password', {
              required: {
                value: true,
                message: '비밀번호를 반드시 입력해주세요',
              },
              minLength: {value: 6, message: '6자 이상 입력해주세요'},
            })}
          />
          {errors.password && <S.P>{errors.password.message}</S.P>}

          <S.Label>Password Confirm</S.Label>
          <S.Input
            type="password"
            {...register('password_confirm', {
              required: {
                value: true,
                message: '비밀번호 확인을 반드시 입력해주세요',
              },
              validate: (value) =>
                value === watch('password') || '비밀번호와 일치하지 않습니다',
            })}
          />
          {errors.password_confirm && (
            <S.P>{errors.password_confirm.message}</S.P>
          )}

          <S.Button>SUBMIT</S.Button>
        </form>
      </S.Container>
    </S.Wrapper>
  );
}
export default SignupPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(14, 19, 45);
`;

const Container = styled.div`
  width: 25%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Label = styled.label`
  color: #ffffff;
  font-size: 20px;
`;

const Input = styled.input`
  width: 96%;
  height: 30px;
  font-size: 25px;
  border: none;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 10px;
  :focus-visible {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  color: #ffffff;
  background-color: #ff6666;
  width: 100%;
  height: 60px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 30px;
  :hover {
    background-color: #cc0000;
    cursor: pointer;
  }
`;

const P = styled.p`
  color: #ffcccc;
  margin-top: -20px;
`;

const S = {
  Wrapper,
  Container,
  Label,
  Input,
  Button,
  P,
};
