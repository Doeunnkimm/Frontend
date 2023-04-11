import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { slide_image_url } from '../../../../Consts/slide-image';
import MoveBtn from './MoveBtn';
import { useNavigate } from 'react-router-dom';

function ReactSlick() {
  const navigate = useNavigate();

  const settings = {
    infinite: false,
    arrow: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <MoveBtn state={'prev'} />,
    nextArrow: <MoveBtn state={'next'} />,
  };

  return (
    <Styled_Slide {...settings}>
      {slide_image_url.map(url => (
        <div>
          <Image src={url} alt="" />
        </div>
      ))}
      <MoreText onClick={() => navigate('/sub')}>더 보러가기</MoreText>
    </Styled_Slide>
  );
}
export default ReactSlick;

const Styled_Slide = styled(Slider)`
  .slick-slider {
    /* 전체를 감싸고 있는 wrap */
    width: 100%;
  }

  .slick-slide {
    /* 이미지 감싸고 있는 wrap */
    height: 290px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Image = styled.img`
  /* 
    실제 이미지 -> 감싸고 있는 wrap보다 살짝 작게 해서  padding 준 것처럼
    wrap에서 padding이나 margin을 주면 슬라이드 크기 자체가 깨져서 아래와 같은 방법을 써야 함
  */
  width: 95%;
  height: 100%;
  object-fit: cover;
`;

const MoreText = styled.div`
  text-align: center;
  line-height: 290px;
  cursor: pointer;
`;
