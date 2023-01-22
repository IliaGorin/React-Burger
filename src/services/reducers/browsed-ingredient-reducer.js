import {
  BROWSED_INGREDIENT,
  CLEAR_BROWSED_INGREDIENT,
} from '../actions/browsed-ingredient-actions';

const initialState = {
  browsedIngredient: null,
};

export const openIngredientCard = (state = initialState, action) => {
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
