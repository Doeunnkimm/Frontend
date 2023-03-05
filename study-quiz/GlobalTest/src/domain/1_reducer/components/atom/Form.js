import { useRef } from 'react';

const Q1Form = ({ onSubmit }) => {
  const text = useRef();
  const price = useRef();

  const onSubmitIngredient = (e) => {
    e.preventDefault();
    onSubmit(text.current.value, price.current.value);
    text.current.value = '';
    price.current.value = '';
  };

  return (
    <form onSubmit={onSubmitIngredient}>
      <label>
        <input type="text" name="name" ref={text} placeholder="재료" />
      </label>
      <label>
        <input type="number" name="price" ref={price} placeholder="가격" />
      </label>
      <button type="submit">추가</button>
    </form>
  );
};
export default Q1Form;
