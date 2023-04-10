import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageMountAnimation } from '../Routes/routing.style';
import ReactSlick from '../Components/Slide/ReactSlick';
import styled from 'styled-components';
import SwiperBox from '../Components/Slide/Swiper';

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
      </section>
    </motion.div>
  );
}
export default Main;

const SlideContainer = styled.div`
  width: 900px;
  margin-left: 30px;
`;
