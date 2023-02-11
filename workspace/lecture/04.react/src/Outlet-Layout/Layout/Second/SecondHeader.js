import styled from 'styled-components';

function SecondHeader() {
  return <Wrapper>SECOND HEADER !</Wrapper>;
}
export default SecondHeader;

const Wrapper = styled.div`
  height: 100px;
  background-color: aquamarine;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
