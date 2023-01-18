import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../actions/index';

const initialStateGet = {
  data: [],
  ingredientsLoading: false,
  ingredientsRequestFailed: false,
};

export const getIngredientsReducer = (state = initialStateGet, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        ingredientsLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsLoading: false,
        data: action.data,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredientsLoading: false,
        ingredientsRequestFailed: true,
        data: state.data,
      };
    }
    default:
      return state;
  }
};
