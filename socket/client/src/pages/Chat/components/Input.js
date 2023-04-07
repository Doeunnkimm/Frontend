import styled from 'styled-components';

const InputBox = ({ message, setMessage, sendMessage }) => {
  return (
    <S.Form>
      <S.Input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <S.Button onClick={e => sendMessage(e)}>Send</S.Button>
    </S.Form>
  );
};
export default InputBox;

const Form = styled.form`
  display: flex;
  border-top: 2px solid #d3d3d3;
`;

const Input = styled.input`
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  padding: 5%;
  width: 80%;
  font-size: 1.2em;
  :focus-visible {
    outline: none;
  }
`;

const Button = styled.button`
  color: #fff !important;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979ff;
  padding: 20px;
  display: inline-block;
  border: none;
  width: 20%;
  :hover {
    cursor: pointer;
  }
`;

const S = { Form, Input, Button };
