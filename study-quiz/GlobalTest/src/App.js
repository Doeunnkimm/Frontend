import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './adapters/router';
import UserProvider from './store/3_context';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
