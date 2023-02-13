import {useEffect, useState} from 'react';
import TimerModal from './modal';

function UseEffect() {
  const [isActive, setIsActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 화면이 마운트 되었을 때만 실행
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (!isActive) return; // 처음 화면 렌더링 되었을 때 한번만 실행하고 싶다면
    console.log('실행');
  }, [isActive]);
  // 화면이 마운트 되었을 때 실행
  // 그 이후에 의존성 배열 내부의 요소가 변할 때마다 실행

  /*
    화면이 마운트 되었을 떄 실행

    의존성 배열 내부의 값에 따라 해당 로직을 재실행할 것인지 실행
    => 특정 state가 바뀔 때마다 실행할 이벤트를 정의
  */

  console.log(count);

  return (
    <div>
      {isActive && (
        <>
          <p>화면이 마운트 되었습니다.</p>
          <TimerModal count={count} setCount={setCount} />
        </>
      )}
      <button onClick={() => setIsActive((prev) => !prev)}>재실행</button>
    </div>
  );
}
export default UseEffect;
