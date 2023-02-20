import {useContext} from 'react';
import {ThemeContext} from './Context/ThemeContext';

function Header() {
  const {isDark} = useContext(ThemeContext);

  return (
    <header
      className="header"
      style={{
        backgroundColor: isDark ? 'black' : 'lightgray',
        color: isDark ? 'white' : 'black',
      }}
    >
      <h1>Welcome React!</h1>
    </header>
  );
}
export default Header;
