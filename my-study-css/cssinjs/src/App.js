import { RouterProvider } from 'react-router-dom';
import { router } from './Soomgo/Routes/router';
import styled from 'styled-components';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
