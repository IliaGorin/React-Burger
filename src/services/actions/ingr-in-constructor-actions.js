import { v4 as uuid4 } from 'uuid';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR = 'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR =
  'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const REORDER_CONSTRUCTOR = 'REORDER_CONSTRUCTOR';

export const addIngredientToConstructor = (ingredient) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    data: ingredient,
    keyId: uuid4(),
  };
};

export const removeIngredientFromConstructor = (ingredient) => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    data: ingredient,
  };
};

export const addBunToConstructor = (bun) => {
  return {
    type: ADD_BUN_TO_CONSTRUCTOR,
    data: bun,
  };
};

export const reorderConstructor = (ingredient) => {
  return {
    type: REORDER_CONSTRUCTOR,
    data: ingredient,
  };
};
