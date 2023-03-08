import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { MockPosts } from '../__mock__/mockPosts';
import { createAction } from './createAction';

export const ADD_POST = createAction('ADD_POST');
export const EDIT_POST = createAction('EDIT_POST');
export const DELETE_POST = createAction('DELETE_POST');

// reducer
const initialState = MockPosts(10);
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      return [action.payload, ...state];
    case 'EDIT_POST':
      const newPosts = [...state];
      const index = newPosts.findIndex((post) => post.id === action.payload.id);
      newPosts[index].content = action.payload.content;
      return newPosts;
    case 'DELETE_POST':
      return state.filter((post) => post.id !== action.payload.id);
    default:
      return state;
  }
};
// reducer들이 담길 rootReducer
export const rootReducer = combineReducers({ postReducer });

const reduxConfig = () => {
  const store = createStore(
    rootReducer,
    process.env.NODE_ENV === 'development' && // 개발 모드일 때만
      composeWithDevTools(applyMiddleware(logger))
  );
  return store;
};

export default reduxConfig;
