import { createBrowserRouter } from 'react-router-dom';
import Main from '../Pages/Main/Main';
import Sub from '../Pages/Sub';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/sub',
    element: <Sub />,
  },
]);
export default router;
