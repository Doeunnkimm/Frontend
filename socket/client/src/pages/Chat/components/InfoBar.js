import styled from 'styled-components';

import closeIcon from '../../../Icons/closeIcon.png';
import onlineIcon from '../../../Icons/onlineIcon.png';

const InfoBar = ({ room }) => {
  return (
    <S.Wrapper>
      <S.LeftContainer>
        <S.OnlineIcon src={onlineIcon} alt="online_image" />
        <h3>{room}</h3>
      </S.LeftContainer>
      <S.RightContainer></S.RightContainer>
      <img
        src={closeIcon}
        width={10}
        onClick={() => (window.location.href = '/')}
        alt="close_image"
      />
    </S.Wrapper>
  );
};
export default InfoBar;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;

  & > img {
    margin-right: 25px;
    :hover {
      cursor: pointer;
    }
  }
`;

const LeftContainer = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;
const RightContainer = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 5%;
`;

const OnlineIcon = styled.img`
  margin-right: 5%;
`;

const S = { Wrapper, LeftContainer, RightContainer, OnlineIcon };
