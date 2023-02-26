import User from './useRef/User';
import {BrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import router from './Outlet-Layout/Routes/routing';
import HomePage from './styled-components-props/Home';
// import Home from './spread-operator/Home';
import Object from './state/Object';
import Component from './useMemo/example1';
import Calculator from './useMemo/example2';
import SmartHome from './useCallback/SmartHome';
import Main from './custom-hook/Main';
import Main2 from './custom-hook/Main2';
import ObjectExample from './symbol/Object';
import Bank from './useReducer/Bank/Bank';
import Simple from './useReducer/simple';
import Attendance from './useReducer/Attendance/Attendance';
import Home from './useContext/Home';

// import './useContext/Styles/index.css';
import SignupPage from './react-hook-form/components/Signup';

function App() {
  return (
    <SignupPage />
    // <Home />
    // <Attendance />
    // <Bank />
    // <Simple />
    // <ObjectExample />
    // <Main2 />
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
