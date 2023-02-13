import Layout from 'components/Layout';
import {createBrowserRouter} from 'react-router-dom';
import HomePage from '../pages/Home';
import TodoPage from '../pages/Todo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // 기본적으로 routing에 레이아웃을 입히는 방법
      // 레이아웃이 있는 페이지도 있고 없는 페이지가 있기 때문에
      // 레이아웃을 적절하게 배치하기 위해서
      // 라우팅을 일부로 children으로 배치
      // 그냥 이렇게 작성하면 children 컴포넌트들이 보이지 않음
      // Layout 컴포넌트 가운데에 Outlet 기능을 사용해야 함
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'todo',
        element: <TodoPage />,
      },
    ],
  },
]);

export default router;
