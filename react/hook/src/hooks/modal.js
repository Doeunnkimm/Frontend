import {useEffect, useRef, useState} from 'react';

function TimerModal({count, setCount}) {
  const TimerRef = useRef();

  useEffect(() => {
    // TimeModal 컴포넌트가 꺼졌다가 켜졌을 때마다
    // setInterval이 계속 한번더 실행됨
    TimerRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    // unmount될 때 타이머를 멈추고 다시 0으로 값을 초기화
    // 따라서 다시 컴포넌트가 마운트 되었을 때는 다시 또
    // useEffect를 실행하기 때문에
    // 0부터 정상적으로 카운트++됨
    return () => {
      clearInterval(TimerRef.current);
      setCount(0);
    };
  }, []);

  return <div>{count}</div>;
}
export default TimerModal;
