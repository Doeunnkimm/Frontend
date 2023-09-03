// import User from './useRef/User';
// import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
// // import router from './Outlet-Layout/Routes/routing';
// import HomePage from './styled-components-props/Home';
// // import Home from './spread-operator/Home';
// import Object from './state/Object';
// import Component from './useMemo/example1';
// import Calculator from './useMemo/example2';
// import SmartHome from './useCallback/SmartHome';
// // import Main from './custom-hook/Main';
// import Main2 from './custom-hook/Main2';
// import ObjectExample from './symbol/Object';
// import Bank from './useReducer/Bank/Bank';
// import Simple from './useReducer/simple';
// import Attendance from './useReducer/Attendance/Attendance';
// // import Home from './useContext/Home';
// import Home from './useNavigate-useLocation/Home';

import { QueryClient, QueryClientProvider } from 'react-query'
import TransitionPage from './useTransition/pages'

// // import './useContext/Styles/index.css';
// import SignupPage from './react-hook-form/components/Signup';
// import Order from './useNavigate-useLocation/Order';
// import ErrorBoundaryIndex from './react-error-boundary';
// import QueryErrorHandlingIndex from './react-query-error-handling';

// import Main from './suspense/useEffect/Main';
// import ListPage from './react-query-useInfiniteQuery/List';
// import { QueryClient, QueryClientProvider } from 'react-query';
// // import router from './practice-components/Routes/routing';
// import { AnimatePresence } from 'framer-motion';
// import { RecoilRoot } from 'recoil';
// import TestMSW from './msw/Pages/product-registration';
// import { worker } from './msw/__mock__/browser';
// import RegisterProduct from './msw/Pages/product-registration';
// import ProductList from './msw/Pages/list/List';
// import router from './msw/Routes/routing';
// import { Provider } from 'jotai';
// import JotaiTest from './jotai/JotaiTest';
// import StoryMain from './storybook-pratice/src';
// // import './index.css'; // storybook을 위해

function App() {
  // worker.start()
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <TransitionPage />
    </QueryClientProvider>
    // <ControllerTest />
    // <NonControllerTest />
    // <YupAndHookForm />
    // <ControllerForm />
    // <StoryMain />
    // <Provider>
    //   <JotaiTest />
    // </Provider>
    // ------------- Nego Market 테스트 용 컴포넌트--------------
    // <RecoilRoot>
    //   <RouterProvider router={router} />
    // </RecoilRoot>
    // ----------------------------------------------------------
    // <RecoilRoot>
    //   <AnimatePresence>
    //     <RouterProvider router={router} />
    //   </AnimatePresence>
    // </RecoilRoot>
    // <QueryClientProvider client={queryClient}>
    //   <ListPage />
    // </QueryClientProvider>
    // <Main />
    // <QueryErrorHandlingIndex />
    // <ErrorBoundaryIndex />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/submit" element={<Order />} />
    //   </Routes>
    // </BrowserRouter>
    // <SignupPage />
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
  )
}

export default App
