import {useRef, useState} from 'react';

// let count = 0;

function UseRef() {
  const HTMLref = useRef(null);
  const count = useRef(0);
  const [isShow, setIsShow] = useState(false);

  const onChangeColor = () => {
    // DOM API에 접근하는 것
    HTMLref.current.style.color = 'red';
    count.current += 1;
  };

  const onShowtadaBtn = () => {
    setIsShow((prev) => !prev);
    // prev => set 함수 인자의 callback 함수의 반환값
    // prev => 현재 가지고 있는 state 함수의 값
    // !prev => false -> true
    //          true -> false
  };

  console.log(count);

  return (
    <>
      {isShow && <div>Tada!</div>}
      {/* 
        react의 HTML에는 ref라는 속성이 있음
        여기에 useRef의 값을 dom에 넣은 것
      */}
      <div ref={HTMLref}>COLORS</div>
      <button onClick={onChangeColor}>색상변경 / 카운트추가</button>
      <button onClick={onShowtadaBtn}>SHOW</button>
    </>
  );
}
export default UseRef;
