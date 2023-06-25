import { Ingredient } from '../../utils/Types/data';

export const BROWSED_INGREDIENT: 'BROWSED_INGREDIENT' = 'BROWSED_INGREDIENT';
export const CLEAR_BROWSED_INGREDIENT: 'CLEAR_BROWSED_INGREDIENT' =
  'CLEAR_BROWSED_INGREDIENT';

type OpenIngredientDetailsAction = {
  readonly type: typeof BROWSED_INGREDIENT;
  data: Ingredient;
};

type CloseIngredientDetailsAction = {
  readonly type: typeof CLEAR_BROWSED_INGREDIENT;
};

export const openIngredientDetails = (
  ingredient: Ingredient
): OpenIngredientDetailsAction => {
  return {
    type: BROWSED_INGREDIENT,
    data: ingredient,
  };
};

export const closeIngredientDetails = (): CloseIngredientDetailsAction => {
  return {
    type: CLEAR_BROWSED_INGREDIENT,
  };
};

export type BrowsedIngredientActions =
  | OpenIngredientDetailsAction
  | CloseIngredientDetailsAction;
