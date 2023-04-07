import styled from 'styled-components';
import ReactEmoji from 'react-emoji';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <S.Container state={'justifyEnd'}>
      <S.SentText state={'trimmedName'}>{trimmedName}</S.SentText>
      <S.Box back={'backgroundBlue'}>
        <S.MessageText color={'colorWhite'}>
          {ReactEmoji.emojify(text)}
        </S.MessageText>
      </S.Box>
    </S.Container>
  ) : (
    <S.Container state={'justifyStart'}>
      <S.Box back={'backgroundLight'}>
        <S.MessageText color={'colorDark'}>
          {ReactEmoji.emojify(text)}
        </S.MessageText>
      </S.Box>
      <S.SentText state={'user'}>{user}</S.SentText>
    </S.Container>
  );
};
export default Message;

const Container = styled.div`
  display: flex;
  justify-content: ${({ state }) =>
    state === 'justifyEnd' ? 'flex-end' : 'flex-start'};
  padding: 0 5%;
  margin-top: 3px;
`;

const SentText = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
  padding-right: ${({ state }) => state === 'trimmedName' && '10px'};
  padding-left: ${({ state }) => state === 'user' && '10px'};
`;

const Box = styled.div`
  background: ${({ back }) =>
    back === 'backgroundBlue' ? '#2979FF' : '#F3F3F3'};
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
`;

const MessageText = styled.p`
  vertical-align: middle;
  color: ${({ color }) => (color === 'colorWhite' ? '#fff' : '#353535')};
`;

const S = { Container, SentText, Box, MessageText };
