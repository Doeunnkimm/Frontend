import styled from 'styled-components';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import InfoBar from './components/InfoBar';
import InputBox from './components/Input';
import Messages from './components/Messages';
import TextContainer from './components/TextContainer';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT, { transports: ['websocket'] });

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room });

    return () => {
      socket.emit('disconnect');
      socket.off();
    };
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages([...messages, message]);
    });
  }, [message]);

  useEffect(() => {
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = e => {
    e.preventDefault();
    console.log(e);

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <S.Wrapper>
      <S.Container>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <InputBox
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </S.Container>
      <TextContainer users={users} />
    </S.Wrapper>
  );
};
export default Chat;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background-color: #1a1a1d;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 8px;
  height: 60%;
  width: 35%;

  @media screen and (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    height: 100%;
  }
  @media screen and (min-width: 480px) and (max-width: 1200px) {
    width: 60%;
  }
`;

const S = { Wrapper, Container };
