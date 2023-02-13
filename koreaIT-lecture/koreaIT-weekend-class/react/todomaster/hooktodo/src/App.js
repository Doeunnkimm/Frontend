import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';

import HomePage from './pages/Home';
import { TodoPage } from './pages/Todo';
import theme from './styles/theme';
import router from './routes/routing';

function App() {
  return (
    // React.Fragment === <></>
    // 컴포넌트는 다른 태그로 감싸주어야 연달아서 사용 가능
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        BrowserRouter : HTML5를 지원하는 브라우저 주소를 감지
        <Routes>
          Routes : Route path와 감지한 주소가 일치한 router만을 렌더링 시켜주는 역할
          <Route path="/" element={<HomePage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </BrowserRouter> */}
    </ThemeProvider>
  );
}

export default App;
