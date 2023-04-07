import styled from 'styled-components';
import onlineIcon from '../../../Icons/onlineIcon.png';

const TextContainer = ({ users }) => {
  console.log(users);
  return (
    <S.Container>
      {users ? (
        <div>
          <h1>People currently chatting:</h1>
          <S.ActiveContainer>
            <h2>
              {users.map(user => (
                <S.ActiveItem>
                  {user.name}
                  <img alt="Online_Icon" src={onlineIcon} />
                </S.ActiveItem>
              ))}
            </h2>
          </S.ActiveContainer>
        </div>
      ) : null}
    </S.Container>
  );
};
export default TextContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  color: white;
  height: 60%;
  justify-content: space-between;
  margin-bottom: 0px;

  img {
    margin-left: 10px;
    padding-top: 10px;
  }

  @media screen and (min-width: 320px) and (max-width: 1200px) {
    display: none;
  }
`;

const ActiveContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50%;
  padding-left: 10px;
`;

const ActiveItem = styled.div`
  display: flex;
  align-items: center;
`;

const S = { Container, ActiveContainer, ActiveItem };
