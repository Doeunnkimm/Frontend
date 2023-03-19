import { Suspense, lazy } from 'react';
import UserSkeleton from './components/Skeletons/user.skeleton';
import { ErrorBoundary } from 'react-error-boundary';
import ApiCustomError from './apis/@error';
// import UserList from './components/UserList';
const UserList = lazy(() => import('./components/UserList'));

// const RenderLoading = () => <p style={{ fontSize: '300px' }}>Loading...</p>;

function App() {
  return (
    <Suspense fallback={<UserSkeleton />}>
      <ErrorBoundary
        fallback={<div>에러발생!!</div>}
        onError={(error) => {
          const { response } = error;
          const err = new ApiCustomError(response.data, response.status);
          alert(err);
          // console.error(error.response.data, 'error');
          // console.error(error.response.status, 'error');
        }}
      >
        {/* 
          children에서 에러가 발생하면
          ErrorBoundary로 error를 throw 하게 되면서
          fallback에 있는 컴포넌트가 화면에 보여지게 됨
        */}
        <UserList />
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
