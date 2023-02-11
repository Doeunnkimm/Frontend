import {Outlet} from 'react-router-dom';
import SecondFooter from './SecondFooter';
import SecondHeader from './SecondHeader';

function SecondLayout() {
  return (
    <>
      <SecondHeader />
      <Outlet />
      <SecondFooter />
    </>
  );
}
export default SecondLayout;
