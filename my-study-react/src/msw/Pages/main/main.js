import { useNavigate } from 'react-router-dom';

function ProductMain() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>메인 페이지</h1>
      <button onClick={() => navigate('/register-product')}>
        물품 등록하기
      </button>
      <button onClick={() => navigate('/list')}>물품 리스트 확인하기</button>
    </div>
  );
}
export default ProductMain;
