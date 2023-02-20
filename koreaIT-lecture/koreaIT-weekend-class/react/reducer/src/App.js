import Counter from './components/counter/counters';
import User from './components/user';
import ContextProvider from './context/user';

function App() {
  return (
    <ContextProvider>
      {/* 
          이렇게 구조를 하게 되면
          ContextProvider에 children 자리에
          해당 태그 안에 있는 요소들이 들어가게 됨
      */}

      <div>
        {/* <Counter /> */}
        <User />
      </div>
    </ContextProvider>
  );
}

export default App;
