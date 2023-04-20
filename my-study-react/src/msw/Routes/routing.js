import { createBrowserRouter } from 'react-router-dom';
import ProductMain from '../Pages/main/main';
import RegisterProduct from '../Pages/product-registration';
import ProductList from '../Pages/list/List';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductMain />,
  },
  {
    path: '/register-product',
    element: <RegisterProduct />,
  },
  {
    path: '/list',
    element: <ProductList />,
  },
]);

export default router;
