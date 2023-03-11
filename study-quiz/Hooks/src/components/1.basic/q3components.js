import styled from 'styled-components';

function Q3components({isJumping}) {
  return <S.Message state={isJumping}> 🏃‍♂️ 줄넘기 ... ing </S.Message>;
}
export default Q3components;

const Message = styled.div`
  visibility: ${({state}) => (state ? 'none' : 'hidden')};
`;

const S = {
  Message,
};
