// import React, { useState, useEffect } from 'react';
// import InputSample from './useRef/InputSample';
import User from './useRef/User';
import {BrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import router from './Outlet-Layout/Routes/routing';
import HomePage from './styled-components-props/Home';
import Home from './spread-operator/Home';
import Object from './state/Object';

const App = () => {
  // const [count, setCount] = useState(0); // useState로 number를 0으로 초기화
  // const [name, setName] = useState('doeunn');

  // useEffect(() => {
  //   console.log('useEffect call !!!');
  // }, [name]);

  // const counter = () => setCount(count + 1);
  // const nameChanger = () => setName('jun');

  return (
    <Object />
    // <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
    // <RouterProvider router={router} />
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
