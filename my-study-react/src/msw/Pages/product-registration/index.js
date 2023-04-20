import axios from 'axios';
import styled from 'styled-components';
import { useRef, useState } from 'react';
import PostCode from '../../../practice-components/Pages/Main/Components/postCode/PostCodeModal';
import ImageInputs from './Components/upload-image/ImageInputs';
import Tag from './Components/tag/Tag';
import Price from './Components/price/Price';

const CATEGORY = ['무료상품', '중고거래'];

function TestMSW() {
  const [formData, setFormData] = useState({
    title: '',
    price: null,
    description: '',
    category: [],
    region: '',
    tag: [],
    images: [],
  });

  console.log(formData);

  const [recentPostList, setRecentPostList] = useState(
    JSON.parse(localStorage.getItem('recentPosts')) === null
      ? []
      : [...JSON.parse(localStorage.getItem('recentPosts'))]
  );

  const onChangeForm = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onChangeCategory = checkIdx => {
    const checkboxes = document.getElementsByName('category');
    checkboxes.forEach((box, i) => {
      if (i !== checkIdx) box.checked = false;
    });
  };

  const onAddProduct = async e => {
    e.preventDefault();

    try {
      const data = await axios.post('/api/product', formData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <Title>상품 등록</Title>
      <form onSubmit={onAddProduct}>
        <Line>
          <h3>상품 이미지*</h3>
          <ImageInputs setFormData={setFormData} />
        </Line>
        <Line>
          <h3>상품명*</h3>
          <ItemBox>
            <Input
              placeholder="상품 제목을 입력해주세요"
              name="title"
              value={formData.title}
              onChange={onChangeForm}
            />
          </ItemBox>
        </Line>
        <Line>
          <h3>카테고리*</h3>
          <ItemBox>
            {CATEGORY.map((cate, i) => (
              <CheckBoxWrapper>
                <input
                  type="checkbox"
                  name="category"
                  value={cate}
                  onChange={e => {
                    onChangeCategory(i);
                    onChangeForm(e);
                  }}
                />
                <label key={i} for={cate}>
                  {cate}
                </label>
              </CheckBoxWrapper>
            ))}
          </ItemBox>
        </Line>
        <Line>
          <h3>가격*</h3>
          <ItemBox>
            <Price setFormData={setFormData} />
          </ItemBox>
        </Line>
        <Line state={'start'}>
          <h3>상품 설명*</h3>
          <ItemBox>
            <textarea
              placeholder="상품 설명을 입력해주세요"
              name="description"
              value={formData.description}
              onChange={onChangeForm}
            />
          </ItemBox>
        </Line>
        <Line state={'start'}>
          <h3>태그</h3>
          <ItemBox>
            <Tag setFormData={setFormData} />
          </ItemBox>
        </Line>
        <Line state={'start'}>
          <h3>거래지역*</h3>
          <ItemBox>
            <PostCode setFormData={setFormData} />
          </ItemBox>
        </Line>
        <Line>
          <SubmitButton type="submit">등록완료</SubmitButton>
        </Line>
      </form>
    </Wrapper>
  );
}
export default TestMSW;

const Wrapper = styled.div`
  width: 60%;
  margin: 0 auto;
`;

const Title = styled.h2`
  width: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
`;

const Line = styled.div`
  display: flex;
  align-items: ${({ state }) => (state === 'start' ? 'start' : 'center')};
  border-top: 1px solid rgb(220, 220, 220);
  margin-top: 20px;
  padding: 10px 0;
`;

const ItemBox = styled.div`
  width: 80%;
  margin-left: auto;
  display: flex;
  align-items: center;

  & > textarea {
    width: 100%;
    height: 300px;
    padding: 10px;
    border: 1px solid rgb(200, 200, 200);
    outline: none;
    resize: none;
    margin-top: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  padding: 10px;
  outline: none;
  box-sizing: border-box;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  & > input {
    appearance: none;
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
    width: 1.5rem;
    height: 1.5rem;
  }

  & > input:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: rgb(150, 150, 150);
  }
`;

const SubmitButton = styled.button`
  margin: 0 auto;
  border: none;
  outline: none;
  padding: 10px;
  margin-top: 20px;
  width: 200px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: rgb(220, 220, 220);
  }
`;
