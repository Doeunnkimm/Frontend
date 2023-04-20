import { useState } from 'react';
import styled from 'styled-components';
import addSeparator from '../../../../Utils/addSeperator';

function Price({ setFormData }) {
  const [value, setValue] = useState(null);

  const onChangePrice = e => {
    const value = e.target.value;

    const filteredValue = value
      .split('')
      .filter(el => el !== ',')
      .join('');
    setFormData(prev => ({ ...prev, price: filteredValue }));
    const newValue = addSeparator(filteredValue);
    setValue(newValue);
  };

  return (
    <S.Input
      placeholder="상품 가격을 입력해주세요"
      name="price"
      value={value}
      onChange={onChangePrice}
    />
  );
}
export default Price;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgb(200, 200, 200);
  padding: 10px;
  outline: none;
  box-sizing: border-box;
`;

const S = { Input };
