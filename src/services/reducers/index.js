import { combineReducers } from 'redux';
import { getIngredientsReducer } from './get-ingredients-reducer';
import { postOrderReducer } from './post-order-reducer';
import { openIngredientCard } from './browsed-ingredient-reducer';

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  order: postOrderReducer,
  openCard: openIngredientCard,
});
