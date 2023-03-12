import { combineReducers } from 'redux'
import { todoSlice } from './todo'

export const rootReducer = combineReducers({ todo: todoSlice.reducer })
