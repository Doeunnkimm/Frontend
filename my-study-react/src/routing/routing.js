import {createBrowserRouter} from 'react-router-dom';
import HomePage from './Home';
import TodoPage from './Todo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/todo',
    element: <TodoPage />,
  },
]);

export default router;
