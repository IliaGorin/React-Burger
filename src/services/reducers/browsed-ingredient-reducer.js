import { BROWSED_INGREDIENT, CLEAR_BROWSED_INGREDIENT } from '../actions';

const initialState = {
  browsedIngredient: {},
  isOpen: false,
};

export const openIngredientCard = (state = initialState, action) => {
  switch (action.type) {
    case BROWSED_INGREDIENT: {
      return {
        ...state,
        browsedIngredient: { ...state.browsedIngredient, ...action.data },
        isOpen: true,
      };
    }
    case CLEAR_BROWSED_INGREDIENT: {
      return {
        ...state,
        browsedIngredient: {},
        isOpen: false,
      };
    }
    default:
      return state;
  }
};
