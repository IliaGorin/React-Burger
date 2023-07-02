import {
  BROWSED_INGREDIENT,
  CLEAR_BROWSED_INGREDIENT,
} from '../actions/browsed-ingredient-actions';
import { Ingredient } from '../../utils/Types/data';
import { BrowsedIngredientActions } from '../actions/browsed-ingredient-actions';

type State = {
  browsedIngredient: null | Ingredient;
};

const initialState: State = {
  browsedIngredient: null,
};

export const openIngredientCard = (
  state = initialState,
  action: BrowsedIngredientActions
): State => {
  switch (action.type) {
    case BROWSED_INGREDIENT: {
      return {
        ...state,
        browsedIngredient: { ...state.browsedIngredient, ...action.data },
      };
    }
    case CLEAR_BROWSED_INGREDIENT: {
      return {
        ...state,
        browsedIngredient: null,
      };
    }
    default:
      return state;
  }
};
