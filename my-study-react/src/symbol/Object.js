import {useState} from 'react';

function ObjectExample() {
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const {email, password} = value;

  const onChangeInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    console.log(value);
  };

  return (
    <div>
      <h1>Symbol Exmaple</h1>
      <input name={'email'} value={email} onChange={onChangeInput}></input>
      <input
        name={'password'}
        value={password}
        onChange={onChangeInput}
      ></input>
    </div>
  );
}
export default ObjectExample;
