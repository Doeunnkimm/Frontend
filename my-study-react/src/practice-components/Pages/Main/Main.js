import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageMountAnimation } from '../../Routes/routing.style';
import ReactSlick from './Components/Slide/ReactSlick';
import styled from 'styled-components';
import SwiperBox from './Components/Slide/Swiper';
import PostCode from './Components/postCode/PostCodeModal';
import Drag from './Components/drag-slide/Drag';

function Main() {
  const navigate = useNavigate();
  return (
    <motion.div {...pageMountAnimation}>
      <h1>메인 페이지</h1>
      <section>
        <h2>1. 페이지 이동 부드럽게</h2>
        <button onClick={() => navigate('/sub')}>서브 페이지로 이동</button>
      </section>
      <section>
        <h2>2. 이미지 슬라이드</h2>
        <h3>(1) React-Slick </h3>
        <h4>npm 주간 다운로드 수 : 113,533</h4>
        <p>
          install을 2개를 해야 하고 css도 2개나 import를 해야했음. 그리고 공식
          docs 설명이 너무 대충이다
        </p>
        <SlideContainer>
          <ReactSlick />
        </SlideContainer>
        <h3>(2) Swiper</h3>
        <h4>npm 주간 다운로드 수 : 1,492,392</h4>
        <SlideContainer>
          <SwiperBox />
        </SlideContainer>
      </section>
      <section>
        <h2>3. 주소</h2>
        <p>☀️ 구현 사항</p>
        <ul>
          <li>현재 내 위치 표시</li>
          <li>DaumPostcode으로 주소 검색 시 지번 주소 중 행정구역까지 표시</li>
          <li>지역 설정 안 하는 옵션도 추가</li>
          <li>
            내 위치, 주소 검색 시 최근 지역에 5개까지 저장(웹 스토리지 이용)
          </li>
          <li>
            행정구역으로 검색 시 지도에 행정구역 Polygon 표시는 개발중입니다..
          </li>
        </ul>
        <PostCode />
      </section>
      <section>
        <h2>4. 드레그 슬라이드</h2>
        <Drag />
      </section>
    </motion.div>
  );
}
export default Main;

const SlideContainer = styled.div`
  width: 900px;
  margin-left: 30px;
`;
