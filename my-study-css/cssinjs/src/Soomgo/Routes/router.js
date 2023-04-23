import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Components/Layouts';
import Main from '../Pages/Main/main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Main />,
      },
    ],
  },
]);
