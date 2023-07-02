import { combineReducers } from 'redux';
import { getIngredientsReducer } from './get-ingredients-reducer';
import { postOrderReducer } from './post-order-reducer';
import { openIngredientCard } from './browsed-ingredient-reducer';
import { ingredientsInConstructorReducer } from './ingr-in-constructor-reducer';
import { usersReducer } from './user-reducer';
import { wsReducer } from './ws-reducer';

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  order: postOrderReducer,
  openCard: openIngredientCard,
  inConstructor: ingredientsInConstructorReducer,
  users: usersReducer,
  wsOrders: wsReducer,
});
