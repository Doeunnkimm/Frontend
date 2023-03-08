import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './adapters/router';
import UserProvider from './store/3_context';
import reduxConfig from './store/4_redux';
import { Provider } from 'react-redux';

function App() {
  const store = reduxConfig();

  return (
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Provider>
  );
}

export default App;
