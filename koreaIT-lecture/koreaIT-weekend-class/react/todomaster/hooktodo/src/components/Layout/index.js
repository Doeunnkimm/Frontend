import BasicHeader from './Header/Header';
import BasicFooter from './Footer/Footer';
import {Outlet} from 'react-router-dom';

function Layout() {
  return (
    <>
      <BasicHeader />
      <Outlet />
      {/* 
        Outlet의 역할은
        자식 요소 중에 있는 엘리먼트 중에서
        들어온 url에 맞게 엘리먼트를 보여주고
        컴포넌트로 가져옴
      */}
      <BasicFooter />
    </>
  );
}
export default Layout;
