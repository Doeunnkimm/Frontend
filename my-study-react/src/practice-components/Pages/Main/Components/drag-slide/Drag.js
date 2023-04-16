import { useRef, useState } from 'react';
import styled from 'styled-components';

function Drag() {
  // 내가 누른 마우스 위치        A
  // 내가 도착해서 놓은 마우스 위치    B
  // 이동한 거리                C

  // 1. 마우스를 눌렀을 때
  //     - 내가 누른 마우스의 위치값(A3) = 이전에 내가 이동했던 거리(C2) + 이번에 내가 누른 마우스의 위치값(A3)

  // 2. 마우스를 이동중일 때
  //     - 이동한 거리(C3) = 내가 도착해서 놓은 마우스 위치(B3) - 내가 누른 마우스의 위치값(A3)

  // 3. 마우스를 놓았을 때
  const [startX, setStartX] = useState(0); // 마우스로 클릭한 첫 번째 지점
  const [endX, setEndX] = useState(0); // 드래그 이후, 도착 지점
  const [isMoved, setIsMoved] = useState(0); // 이전 거리값을 유지하면서 다음 클릭이 일어났을 때, 거리값을 합산할 값

  const sliderRef = useRef(null); // 슬라이드를 담고있는 부모 요소

  const onTouchStart = e => {
    if (e.touches[0].clientX) setStartX(Math.floor(e.touches[0].clientX));
  }; // 눌렀을때

  const onTouchMove = e => {
    const newEndX = Math.floor(e.touches[0].clientX);
    setEndX(newEndX);

    const diffX = isMoved + newEndX - startX; // 이동 거리값

    if (diffX > 0 && sliderRef.current.getBoundingClientRect().x > 0) return;
    console.log(sliderRef.current.getBoundingClientRect().x);
    sliderRef.current.style.transform = `translateX(${diffX}px)`;

    console.log('시작지점 : ' + startX);
    console.log('도착지점 : ' + endX);
    console.log('이동거리 : ' + isMoved);
  }; // 이동하고 있을때

  const onTouchEnd = () => {
    setIsMoved(isMoved + endX - startX);
  }; // 끝났을때

  return (
    <S.Wrapper>
      {/* <div id="map" style={{ width: '500px', height: '500px' }}></div> */}
      <S.Slider
        ref={sliderRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <S.Slide>1</S.Slide>
        <S.Slide>2</S.Slide>
        <S.Slide>3</S.Slide>
        <S.Slide>4</S.Slide>
        <S.Slide>5</S.Slide>
        <S.Slide>6</S.Slide>
        <S.Slide>7</S.Slide>
      </S.Slider>
    </S.Wrapper>
  );
}
export default Drag;

const Wrapper = styled.div`
  width: 950px;
  overflow: hidden;
`;

const Slider = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: center;
`;

const Slide = styled.div`
  cursor: pointer;
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  margin-right: 20px;
  background: #aaa;
  font-size: 100px;
`;

const S = {
  Wrapper,
  Slider,
  Slide,
};
