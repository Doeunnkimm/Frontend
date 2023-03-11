import { useNavigate } from "react-router-dom";
import Q1 from "../hooks/1.basic/q1";
import Q2 from "../hooks/1.basic/q2";
import Q3 from "../hooks/1.basic/q3";

function HooksPage() {
  const navigate = useNavigate();

  const onNavigateStatePage = () => {
    navigate("/state");
  };

  return (
    <div>
      <h4>모든 문제의 데이터 및 변수는 풀이에 알맞도록 수정할 수 있습니다</h4>
      <hr />
      <Q1 />
      <hr />
      <Q2 />
      <hr />
      <Q3 />
      <hr />
      <button onClick={onNavigateStatePage}>다음으로</button>
    </div>
  );
}
export default HooksPage;
