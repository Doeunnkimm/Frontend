
import {Suspense, lazy} from 'react'
import logo from './logo.svg';
import './App.css';
import UserSkeleton from './components/Skeletons/user.skeleton';
// import UserList from './components/UserList';
const UserList = lazy(()=> import("./components/UserList"))



const RenderLoading = () => <p style={{fontSize: "300px"}}>Loading...</p>
function App() {
  return (
    <Suspense fallback={<UserSkeleton/>}>
      <UserList/>
    </Suspense>
  );
}

export default App;
