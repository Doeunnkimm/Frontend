const {useState} = require('react');

/*
    custom hook
        hook 함수를 사용하여 정의한 함수
        어디서나 재사용될 수 있어야 함
*/

const useInput = (initialValue) => {
  const [value, setValue] = useState();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return [value, onChange, setValue];
};
export default useInput;
