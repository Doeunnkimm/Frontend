/*
    reducer도 여러 개
    ex. user기능, todo기능, ...
     => 그래서 합쳐줄 수 있는 route reducer가 필요
*/

import {combineReducers} from 'redux';
import user from './user';

// 꼭 객체 안에 reducer들을 넣어줘야 함!!
export const rootReducer = combineReducers({user});
