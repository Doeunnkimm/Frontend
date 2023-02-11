import {createBrowserRouter} from 'react-router-dom';
import Layout from '../Layout/Main/Layout';
import SecondLayout from '../Layout/Second/SecondLayout';
import Home from '../Pages/Main/Home';
import TodoPage from '../Pages/Main/Todo';
import SecondHome from '../Pages/Second/Home';
import SecondTodoPage from '../Pages/Second/Todo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'todo',
        element: <TodoPage />,
      },
    ],
  },
  {
    path: '/second',
    element: <SecondLayout />,
    children: [
      {
        path: '',
        element: <SecondHome />,
      },
      {
        path: 'todo',
        element: <SecondTodoPage />,
      },
    ],
  },
]);
export default router;
