import styled from 'styled-components';

function ProductCard({product, onNavigate}) {
  const {
    productName,
    productNumber,
    productPrice,
    productSize,
    productRating,
    productReview,
  } = product;

  return (
    <S.Item onClick={onNavigate}>
      <h4>{productName}</h4>
      <p>상품번호: {productNumber}</p>
      <p>가격: {productPrice}원</p>
      <p>사이즈: {productSize}</p>
      <p>평점: {productRating}</p>
      <p>리뷰: {productReview}</p>
    </S.Item>
  );
}
export default ProductCard;

const Item = styled.li`
  border: 1px solid #000;
  cursor: pointer;
  width: 300px;
  margin: 16px auto;
`;

const S = {
  Item,
};
