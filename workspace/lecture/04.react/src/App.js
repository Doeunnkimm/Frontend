// import React, { useState, useEffect } from 'react';
// import InputSample from './useRef/InputSample';
import User from './useRef/User';
import {RouterProvider} from 'react-router-dom';
import router from './routing/routing';

const App = () => {
  // const [count, setCount] = useState(0); // useState로 number를 0으로 초기화
  // const [name, setName] = useState('doeunn');

  // useEffect(() => {
  //   console.log('useEffect call !!!');
  // }, [name]);

  // const counter = () => setCount(count + 1);
  // const nameChanger = () => setName('jun');

  return (
    <RouterProvider router={router} />
    // <InputSample />
    // <User />
    // <div>
    //   <div>{count}</div>
    //   <div>{name}</div>
    //   <button onClick={counter}>count up</button>
    //   <button onClick={nameChanger}>change Name</button>
    // </div>
  );
};

export default App;
