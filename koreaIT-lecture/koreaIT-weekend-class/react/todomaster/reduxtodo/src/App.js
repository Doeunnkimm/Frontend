import {RouterProvider} from 'react-router-dom';

import {ThemeProvider} from 'styled-components';
import GlobalStyles from './styles/global';

import theme from './styles/theme';
import router from './routes/routing';

import {Provider} from 'react-redux';
import {store} from 'store/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

/*
  redux를 사용하자

  1. Provider로 덮어준다

  2. store를 만들어서 Provider의 store 속성에 넣어준다
      이때 store는 외부로 분리해도 좋다
      ex) store/store.js
          export const store = createStore();
          ** 이 store에는 rootReducer가 들어간다

  3. rootReducer를 만든다.
      reducer 폴더를 따로 만들기도 하지만 폴더가 너무 많을 경우에는
      rootReducer를 store 폴더에 같이 만들기도 한다
      @root.js 로 만들었다(앞에 특수문자를 붙여주면 폴더 맨 위로 올라간다)
          ※ index 파일에는 붙이지 말자. 이미 index라는 이름 자체로 엔트리 파일의 의미를 갖는다

  4. 3에서 만들어놓았던 store에 rootReducer를 채워준다.

  5. 4에 이어서 미들웨어를 설정한다.

    ex)
      process.env.NODE_ENV === 'development' &&
          composeWithDevTools(applyMiddleware(logger))

  6. 이제는 필요에 맞게 rootReducer를 reducer들로 채워서 사용할 준비를 하자
      ㄱ) initialState를 만든다.
            여기에는 우리가 전역에서 관리할 데이터들이 담겨있다
            관리할 값이 여러 개라면 객체 형태로 작성하자
            {
              todos: [],
              Users: [], ...
            }

      ㄴ) reducer를 만들어준다.
              const reducer = (state=initialState, action) => {}

      ㄷ) reducer 함수 안을 채워준다. switch-case문으로
              자세한 로직이 당장 생각나지 않는다면 case ___ 부분은 우선 적어놓고
              return 부분은 그냥 return; 하고 비어놓는다

      ㄹ) case에 들어가는 부분을 createAction으로 export 시켜준다.
              ex) export const addTodo = createAction('ADD_TODO);
              --> 나중에 오탈자로 인해 에러가 발생할 일을 예방한다
                    참고로 사용할 떄는 payload만 전달하면 된다.

      ㅁ) reducer를 export 한다.
      
      ㅁ) 만든 reducer를 rootReducer 안에 넣어준다.
            ex) import todo from ./todo
                --> reducer를 export default 해주었기 때문에
                    내가 이름을 todo로 해서 가져온 것이다.

                *** rootReducer({todo})


    -----------------------------------------------------------------------------------
                
      **** Context와 redux의 차이점
      1. Context는 reducer 하나 당 store 하나씩 다 만들어서 각각 import해서 사용했었음
            그런데 redux는 rootReducer라는 큰 저장소 안에 reducer들을 담아서 사용했었음

*/
