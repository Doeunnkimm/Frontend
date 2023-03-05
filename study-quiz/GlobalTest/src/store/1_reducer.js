import { createAction } from './createAction';

export const ADD_INGREDIENT = createAction('ADD_INGREDIENT');
export const DELETE_INGREDIENT = createAction('DELETE_INGREDIENT');

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return [...state, action.payload];
    case 'DELETE_INGREDIENT':
      return state.filter((ingredient) => ingredient.id !== action.payload.id);
    default:
      return state;
  }
};

export default ingredientReducer;
