import { v4 as uuid4 } from 'uuid';
import { Ingredient } from '../../utils/Types/data';

export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' =
  'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR: 'ADD_BUN_TO_CONSTRUCTOR' =
  'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' =
  'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const REORDER_CONSTRUCTOR: 'REORDER_CONSTRUCTOR' = 'REORDER_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

type AddIngredientToConstructorAction = {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  data: Ingredient;
  keyId: string;
};

type RemoveIngredientFromConstructorAction = {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  data: string;
};

type AddBunToConstructorAction = {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  data: Ingredient;
};

type ReorderConstructorAction = {
  readonly type: typeof REORDER_CONSTRUCTOR;

  data: { dragIndex: number; hoverIndex: number };
};

type СlearConstructorAction = {
  readonly type: typeof CLEAR_CONSTRUCTOR;
};

export const addIngredientToConstructor = (
  ingredient: Ingredient
): AddIngredientToConstructorAction => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    data: ingredient,
    keyId: uuid4(),
  };
};

export const removeIngredientFromConstructor = (
  ingredient_ID: string
): RemoveIngredientFromConstructorAction => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    data: ingredient_ID,
  };
};

export const addBunToConstructor = (
  bun: Ingredient
): AddBunToConstructorAction => {
  return {
    type: ADD_BUN_TO_CONSTRUCTOR,
    data: bun,
  };
};

export const reorderConstructor = (ingredient: {
  dragIndex: number;
  hoverIndex: number;
}): ReorderConstructorAction => {
  return {
    type: REORDER_CONSTRUCTOR,
    data: ingredient,
  };
};

export const clearConstructor = (): СlearConstructorAction => {
  return {
    type: CLEAR_CONSTRUCTOR,
  };
};

export type IngredientInConstructorActions =
  | AddIngredientToConstructorAction
  | RemoveIngredientFromConstructorAction
  | AddBunToConstructorAction
  | ReorderConstructorAction
  | СlearConstructorAction;
