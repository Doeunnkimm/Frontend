import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { slide_image_url } from '../../Consts/slide-image';
import styled from 'styled-components';

function SwiperBox() {
  return (
    <Styled_Swiper
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={4}
      slidesPerGroup={4}
      speed={800}
      navigation
    >
      {slide_image_url.map(url => (
        <Styled_SwiperSlide key={url}>
          <Image src={url} alt="" />
        </Styled_SwiperSlide>
      ))}
      <Styled_SwiperSlide>
        <MoreText>더 보러가기</MoreText>
      </Styled_SwiperSlide>
    </Styled_Swiper>
  );
}
export default SwiperBox;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Styled_SwiperSlide = styled(SwiperSlide)`
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    height: 290px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MoreText = styled.div`
  text-align: center;
  line-height: 290px;
  cursor: pointer;
`;

const Styled_Swiper = styled(Swiper)`
  .swiper-button-prev,
  .swiper-button-next {
    color: #000;
  }
`;
