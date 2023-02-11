import {Outlet} from 'react-router-dom';
import Footer from './MainFooter';
import Header from './MainHeader';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export default Layout;
