import { BROWSED_INGREDIENT, CLEAR_BROWSED_INGREDIENT } from '../actions';

const initialState = {
  browsedIngredient: {},
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
        browsedIngredient: {},
      };
    }
    default:
      return state;
  }
};
