import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>Join</S.Header>

        <S.JoinInput
          placeholder="Name"
          type="text"
          onChange={e => setName(e.target.value)}
        />
        <S.JoinInput
          placeholder="Room"
          type="text"
          onChange={e => setRoom(e.target.value)}
        />
        <Link
          onClick={e => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <S.Button type="submit">Sign In</S.Button>
        </Link>
      </S.Container>
    </S.Wrapper>
  );
};
export default Join;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 98vh;
  align-items: center;
  background-color: #1a1a1d;
`;

const Container = styled.div`
  width: 20%;
`;

const Header = styled.h1`
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;

const JoinInput = styled.input`
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
  box-sizing: border-box;
  :focus-visible {
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  color: #fff !important;
  text-transform: uppercase;
  background: #2979ff;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  :hover {
    cursor: pointer;
  }
`;

const S = { Wrapper, Container, Header, JoinInput, Button };
