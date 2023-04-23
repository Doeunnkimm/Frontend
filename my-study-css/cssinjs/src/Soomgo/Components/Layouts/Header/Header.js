import styled from 'styled-components';
import { FlexAlignCenterCSS, GridColumn12CSS } from '../../../../Styles/common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <S.Wrapper>
      <S.Container>
        <S.BarsIcon>
          <FontAwesomeIcon icon={faBars} />
        </S.BarsIcon>
        <S.Logo />
        <S.SearchIcon>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </S.SearchIcon>
        <section>
          <ul>
            <li>서비스요청</li>
            <li>고수찾기</li>
            <li>마켓</li>
            <li>커뮤니티</li>
          </ul>
        </section>
      </S.Container>
    </S.Wrapper>
  );
}
export default Header;

const Wrapper = styled.div`
  ${GridColumn12CSS};
  margin-top: 1.2em;
`;

const Container = styled.div`
  ${FlexAlignCenterCSS};
  grid-column: 4 / 10;
  @media screen and (max-width: 991px) {
    grid-column: 1 / -1;
    padding: 0 0.5rem;
  }

  & > section > ul {
    display: flex;

    @media screen and (max-width: 991px) {
      display: none;
    }
  }

  & li {
    list-style: none;
    font-weight: bold;
    margin: 0 1rem;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  width: 85px;
  height: 30px;
  background-image: url('https://assets.cdn.soomgo.com/icons/icon-navi-logo.svg');
  background-repeat: no-repeat;
  background-size: 100%;
`;

const IconBox = styled.span`
  display: none;
  cursor: pointer;
  @media screen and (max-width: 991px) {
    display: inline-block;
  }
`;
const BarsIcon = styled(IconBox)`
  margin-right: 1rem;
`;

const SearchIcon = styled(IconBox)`
  margin-left: auto;
`;

const S = { Wrapper, Container, Logo, BarsIcon, SearchIcon };
