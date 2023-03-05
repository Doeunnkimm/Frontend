import { useNavigate } from "react-router-dom";

const NavigateButton = ({ isFistPage, isLastPage, to }) => {
  const navigate = useNavigate();

  const onPrevPage = () => {
    navigate(-1);
  };

  const onNextPage = () => {
    navigate(to);
  };

  return (
    <div style={{ margin: "24px 0" }}>
      {!isFistPage && <button onClick={onPrevPage}>이전 페이지</button>}
      {!isLastPage && <button onClick={onNextPage}>다음 페이지</button>}
    </div>
  );
};
export default NavigateButton;
