import User from './useRef/User';
import {BrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import router from './Outlet-Layout/Routes/routing';
import HomePage from './styled-components-props/Home';
import Home from './spread-operator/Home';
import Object from './state/Object';
import Component from './useMemo/example1';
import Calculator from './useMemo/example2';
import SmartHome from './useCallback/SmartHome';
import Main from './custom-hook/Main';
import Main2 from './custom-hook/Main2';

function App() {
  return (
    <Main2 />
    // <Main />
    // <SmartHome />
    // <Calculator />
    // <Component />
    // <Object />
    // <RouterProvider router={router} />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //   </Routes>
    // </BrowserRouter>
    // <RouterProvider router={router} />
  );
}

export default App;
