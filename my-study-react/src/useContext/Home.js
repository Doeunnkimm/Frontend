import {useState} from 'react';
import Page from './Page';
import {ThemeContext} from './Context/ThemeContext';
import {UserContext} from './Context/UserContext';

function ContextHome() {
  const [isDark, setIsDark] = useState(false);
  return (
    <UserContext.Provider value={'이병건'}>
      <ThemeContext.Provider value={{isDark, setIsDark}}>
        <Page />;
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
export default ContextHome;
