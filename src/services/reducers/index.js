import { combineReducers } from 'redux';
import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  SEND_ORDER,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
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

const initialStatePost = {
  order: 0,
  orderPostProcessing: false,
  orderPostFailed: false,
};

export const postOrderReducer = (state = initialStatePost, action) => {
  switch (action.type) {
    case SEND_ORDER: {
      return {
        ...state,
        orderPostProcessing: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderPostProcessing: false,
        order: action.order,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderPostProcessing: false,
        orderPostFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  ingredients: getIngredientsReducer,
  order: postOrderReducer,
});
