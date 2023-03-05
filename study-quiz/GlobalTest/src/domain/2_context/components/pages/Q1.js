import { useState } from "react";
import NavigateButton from "../../../../components/NavigateButton";
import ContextQ1Detail from "../atom/Q1/Detail";
import ContextQ1Modal from "../atom/Q1/Modal";

const ContextQ1Page = () => {
  /* 
        문제 2-1)
        전역 모달창 띄우기

        1) ContextQ1Detail, ContextQ1Detail2 두 컴포넌트의 보이기 버튼이 눌려야만 모달창이 보여야 합니다.
          모달창이 보이는 상태일 때는 숨기기 텍스트로 바뀌어 모달창을 닫을 수 있어야 합니다.

        2) 모달창은 현재 위치인 Detail 컴포넌트의 가장 바깥쪽 div에 렌더링 되어야 합니다.
        3) 모달창은 ContextQ1Modal 컴포넌트를 사용합니다.
        4) 모달의 state는 useContext를 사용하여 관리합니다. (props를 사용하지 않습니다.)
        5) 단, useReducer를 사용하지 않고 state만을 관리합니다. (useReducer는 다음 문제에서 사용합니다.)

        src/stor/2_context.js 파일에 context를 구현해주세요
    */

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 위의 상태를 전역으로 관리하여 ContextQ1Detail, ContextQ1Detail2 두 컴포넌트의 보이기 버튼이 눌려도 모달창이 열릴 수 있도록 해주세요 :)

  return (
    <div>
      {isModalOpen && <ContextQ1Modal />}
      <h2>문제 2 - 1</h2>
      <ContextQ1Detail />
      <NavigateButton to={"/2_context/q2"} />
    </div>
  );
};
export default ContextQ1Page;
