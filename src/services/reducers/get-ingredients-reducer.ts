import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GetIngredientsActions,
} from '../actions/get-ingredients-actions';
import { Ingredient } from '../../utils/Types/data';

type State = {
  data: Array<Ingredient> | null;
  ingredientsLoading: boolean;
  ingredientsRequestFailed: boolean;
};

const initialStateGet: State = {
  data: [],
  ingredientsLoading: false,
  ingredientsRequestFailed: false,
};

export const getIngredientsReducer = (
  state = initialStateGet,
  action: GetIngredientsActions
): State => {
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
