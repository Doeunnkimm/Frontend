import styled from 'styled-components';

function SecondHome() {
  return (
    <Wrapper>
      <Title>두 번째 메인페이지</Title>
    </Wrapper>
  );
}
export default SecondHome;

const Wrapper = styled.div`
  width: 100%;
  height: 100px;
`;

const Title = styled.h3`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
`;
