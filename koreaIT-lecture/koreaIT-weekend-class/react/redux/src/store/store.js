import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from '../reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';

const reduxConfig = () => {
  /*
    중간에 미들웨더 관련한 함수를 실행해줘야 할 수 있어서
    함수 형태로 작성해주었고 이 함수를 export해준 것
  */
  const store = createStore(
    rootReducer,
    /*
      composeWithDevTools : DevTools를 사용하겠다
      applyMiddleware(logger) : 미들웨어를 적용시켜주는 역할

      ==> 미들웨어랑 devtools를 같이 쓰겠다는 의미
    */

    /*
      개발자 모드일 때만 실행되도록
    */
    process.env.NODE_ENV === 'development' &&
      composeWithDevTools(applyMiddleware(logger))
  );
  return store;
};

export default reduxConfig;
