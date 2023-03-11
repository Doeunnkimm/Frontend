import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/2.state/product';
import productList from '../../__mock__/products.json';

function State3() {
  /*
    문제 3.
    심화문제 입니다
    
    아래는 가상의 커머스 사이트 mock data입니다

    요구 사항

    1. 구매후기 및 상제를 제외한 데이터의 모든 정보는 화면에 노출되어야 합니다.
        단, 가격표는 3자리마다 ,를 작성해야합니다.

    2. 해당 상품을 클릭하면 상세 페이지로 이동합니다.
    
    3.
      상세페이지 주소에는 클릭한 상품의 상품번호가 노출되어야 합니다
      해당 router (주소설정)은 제가 모두 app.js에 해두었습니다

      ex) /state/detail/301389

      해당 상품번호를 주소에서 부터 받아와야합니다.
      받아온 데이터를 토대로

      useEffect를 활용하여 products 데이터에서
      올바른 데이터를 찾아내어 해당 데이터만 따로 state로 관리합니다

      * 주의
        본래 로직이라한다면 주소의 상품번호를 백엔드에게 전송하여 데이터를 받아오는 로직이었을겁니다
        그러나 백엔드가 없기에 최대한 유사하게 페이지를 구사해보았습니다


      상세페이지는 pages/Detail.js이며

    4.  상세 페이지에서는 페이지의 상세 내용을 확인할 수 있으며
        구매평을 추가할 수 있습니다 (수정 및 삭제는 state2에서 풀이하였으므로 구현하지 않아도 괜찮습니다)
  */

  console.log(productList.products);

  const navigate = useNavigate();

  const onNavigateDetailPage = (idx) => {
    navigate(`/state/detail/${idx + 1}`);
  };

  return (
    <>
      <h1>문제3</h1>
      <h2>상품 목록</h2>
      <ul>
        {productList.products.map((product, idx) => (
          <ProductCard
            product={product}
            onNavigate={() => onNavigateDetailPage(idx)}
          />
        ))}
      </ul>
    </>
  );
}
export default State3;

const Item = styled.li`
  border: 1px solid #000;
  cursor: pointer;
  width: 300px;
  margin: 16px auto;
`;

const S = {
  Item,
};
