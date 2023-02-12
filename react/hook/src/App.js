import UseCallback from './hooks/useCallback';
import UseEffect from './hooks/useEffect';
import UseMemo from './hooks/useMemo';
import UseRef from './hooks/useRef';
import UseState from './hooks/useState';

function App() {
  return (
    <>
      <UseState />
      <UseRef />
      <UseMemo />
      <UseCallback />
      <UseEffect />
    </>
  );
}

export default App;
