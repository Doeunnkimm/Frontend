import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CATEGORY_LIST } from '../../Consts/category';

function ProductList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [category, setCategory] = useState();
  const [keyword, setKeyword] = useState('');

  const getProductList = useCallback(async () => {
    const { data } = await axios.get('/api/product/search', {
      params: { category },
    });
    setList(data);
  }, [category, keyword]);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  return (
    <>
      <h1>상품 리스트 페이지</h1>
      <button onClick={() => navigate('/register-product')}>
        상품 등록하러 하기
      </button>
      <QueryBox>
        <span>
          <select
            name="category"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value="default">전체</option>
            <option value="0">나눔상품</option>
            <option value="1">중고상품</option>
          </select>
        </span>
        <span>
          <input placeholder="키워드 검색" />
          <button>검색</button>
        </span>
      </QueryBox>
      <section>
        {list.map(item => (
          <Box>
            <div>
              {item.images.map(img => (
                <img src={img} alt="" width="200px" />
              ))}
            </div>
            <h3>{item.title}</h3>
            <div>{item.description}</div>
            <strong>{item.price}</strong>
            <div style={{ float: 'right' }}>
              {CATEGORY_LIST[parseInt(item.category)]}
            </div>
          </Box>
        ))}
      </section>
    </>
  );
}
export default ProductList;

const Box = styled.div`
  background-color: rgb(240, 240, 240);
  width: fit-content;
  padding: 20px;
  margin: 10px;
`;

const QueryBox = styled.div`
  margin-top: 20px;
  padding: 10px 0;
`;
