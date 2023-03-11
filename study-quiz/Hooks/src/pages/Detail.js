import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

import productList from '../../src/__mock__/products.json';

function DetailPage() {
  const params = useParams();
  console.log(params.productNumber);

  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    /* 
      서버에서 데이터를 받아서 state를 업데이트 하듯이
      useEffect 안에서 상세 정보를 받았습니다
    */

    const thisPageProductInfo = productList.products[params.productNumber - 1];
    setProductInfo({...thisPageProductInfo});
  }, []);

  return (
    <S.Wrapper>
      {/* 
      상세 페이지는 자유롭게 꾸미시면 됩니다.
      아직 해당 부분의 진도가 나가지 않았기 때문에 주소의 파람을 가지고 올 수 있는 방법은
      미리 콘솔에 찍어두었습니다.

      단, 없는 번호 상품으로 접근 시 state페이지로 돌아가도록 구현해주세요
    */}

      <S.Title>{productInfo.productName}</S.Title>
      <S.NumberText>{productInfo.productNumber}</S.NumberText>
      <S.Ul>
        <S.Li>
          <S.Icon>💸</S.Icon>
          <S.Text>{productInfo.productPrice}원</S.Text>
        </S.Li>
        <S.Li>
          <S.Icon>📐</S.Icon>
          <S.Text>{productInfo.productSize}</S.Text>
        </S.Li>
        <S.Li state={'last'}>
          <S.Icon>👑</S.Icon>
          <S.Text>{productInfo.productRating}점</S.Text>
        </S.Li>
      </S.Ul>
      <S.ReviewWrapper>
        <S.ReviewTitle>Review!</S.ReviewTitle>
        {productInfo.Review &&
          productInfo.Review.map((review) => (
            <S.ReviewBox>
              <div style={{marginRight: '50px'}}>{review.reviewer}</div>
              <div>{review.review}</div>
              <div style={{marginLeft: 'auto'}}>👍 {review.rating}</div>
            </S.ReviewBox>
          ))}
      </S.ReviewWrapper>
    </S.Wrapper>
  );
}
export default DetailPage;

const Wrapper = styled.div`
  padding: 50px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 40px;
`;

const Icon = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const Text = styled.div`
  font-size: 18px;
`;

const NumberText = styled.div`
  color: gray;
  font-weight: bold;
  font-size: 15px;
  margin-top: 30px;
`;

const Ul = styled.ul`
  border: 1px solid gray;
  width: 15%;
  margin: 0 auto;
  margin-top: 60px;
  border-radius: 8px;
`;

const Li = styled.li`
  border-bottom: ${({state}) => !state && '1px solid gray'};
  display: flex;
  justify-content: space-between;
  padding: 30px;
  :hover {
    transition: all 0.2s ease-in-out;
    background-color: rgb(240, 240, 240);
  }
`;

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const ReviewTitle = styled.div`
  border-bottom: 1px solid gray;
  padding: 30px;
  width: 50%;
`;

const ReviewBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: ${({state}) => !state && '1px solid gray'};
  padding: 15px 0;
  width: 30%;
  margin-top: 40px;
`;

const S = {
  Wrapper,
  Title,
  Icon,
  Text,
  NumberText,
  Ul,
  Li,
  ReviewWrapper,
  ReviewTitle,
  ReviewBox,
};
