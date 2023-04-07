import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import styled from 'styled-components';

const Messages = ({ messages, name }) => {
  return (
    <S.Wrapper>
      <ScrollToBottom>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        ))}
      </ScrollToBottom>
    </S.Wrapper>
  );
};
export default Messages;

const Wrapper = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;

const S = { Wrapper };
