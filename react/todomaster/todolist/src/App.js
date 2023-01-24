import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import { TodoPage } from './pages/Todo';

function App() {
  return (
    // React.Fragment === <></>
    // 컴포넌트는 다른 태그로 감싸주어야 연달아서 사용 가능
    <BrowserRouter>
      {/* BrowserRouter : HTML5를 지원하는 브라우저 주소를 감지 */}
      <Routes>
        {/* Routes : Route path와 감지한 주소가 일치한 router만을 렌더링 시켜주는 역할 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
