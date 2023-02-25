import {createStore} from 'redux';
import {Provider} from 'react-redux';

import User from './components/user';
import {rootReducer} from './reducer';
import reduxConfig from './store/store';
import {useEffect} from 'react';

function App() {
  /* 저장소에 rootReducer(모든 reducer를 모아둔)를 등록 */
  // const store = createStore(rootReducer);
  const store = reduxConfig(); // 리턴값이 store이므로 실행해서 등록
  console.log(process.env.NODE_ENV);

  useEffect(() => {
    let ignore = true;
    console.log('start');

    return () => {
      if (ignore) return;
      console.log('stop');
      ignore = false;
    };
  }, []);

  /*
    1. development
      개발자들 (npm start)

    2. production
      npm build -> 생성된(번들링 된) -> 사용자가 보게 될 화면
  */

  /*
    1. rootReducer 파일을 생성
      reducer는 여러 파일이 생성될 수 있으므로 reducer들을 하나로 합칠 rootReducer가 필요하다
      export const rootReducer = combineReducers({});

    2. 비어있는 store를 생성
      createStore()

    3. store에 reducer를 채워놨다
      createStore(rootReducer)

    4. Provider(덮개)를 생성 app.js에서 덮고 store 속성에 내가 만든 store를 전달
      import {Provider} from 'react-redux';

      store에 다양한 기능을 위하여 함수 형태로 만들어 줄 필요가 있다
      store -> store.js로 store를 빼서 함수형으로 만들었다

      ex)
          const reduxConfig = () => {
      
          const store = createStore(rootReducer);
          return store;
          };

    5. rootReducer는 지금 비어있다.
       필요한 reducer를 선언해서 담아줘야 한다.
       이때 담기는 reducer는 useReducer에서 처럼 (state, action)을 매개변수로 받아 switch문으로 작성하면 된다
       *다만, 아예 매개변수로 state=initialState라고 작성하여 해당 reducer의 state가 initialState를 가지도록 한다      

    6. store에 담겨있는 reducer를 사용하기 위한 컴포넌트에서
          rootReducer에 담겨있는 필요한 reducer를 useSelector를 통해 불러온다

          ex) const userList = useSelector((state) => state.user)
              => state = rootStore에서 user라는 reducer의 state(=initialState)를 가져와서 담는다.
              => userList에는 user라는 reducer의 initialState가 담겨있다!

              ===> reducer에 담겨 있는 state를 가져와 변수에 저장해 두었다

    7.  useDispatch를 통해 rootReducer에게 action 객체를 보낼 수 있다
          ex) const dispatch = useDispatch();

    8. npm i -D redux-devtools-extension redux-logger
  */

  return (
    <Provider store={store}>
      <User />
    </Provider>
  );
}

export default App;
