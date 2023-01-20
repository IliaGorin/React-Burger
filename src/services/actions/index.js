import { v4 as uuid4 } from 'uuid';
import { URL_API } from '../../utils/constants';

export const BROWSED_INGREDIENT = 'BROWSED_INGREDIENT';
export const CLEAR_BROWSED_INGREDIENT = 'CLEAR_BROWSED_INGREDIENT';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR =
  'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`error ${res}`);
}

export function sendRequest(url, options) {
  return fetch(`${URL_API}${url}`, options).then(checkResponse);
}

export const getIngredients = () => {
  return (dispatch) => {
    dispatch({
      type: GET_INGREDIENTS,
    });
    sendRequest(`/ingredients`)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          error: err.message,
        });
      });
  };
};

export const postOrder = (orderedIngredients) => {
  return (dispatch) => {
    dispatch({
      type: SEND_ORDER,
    });
    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: orderedIngredients }),
    };
    sendRequest(`/orders`, postDetails)
      .then((res) => {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          order: res.order.number,
        });
      })
      .catch((err) => {
        dispatch({
          type: SEND_ORDER_FAILED,
          error: err.message,
        });
      });
  };
};

export const openIngredientDetails = (ingredient) => {
  return {
    type: BROWSED_INGREDIENT,
    data: ingredient,
  };
};

export const closeIngredientDetails = () => {
  return {
    type: CLEAR_BROWSED_INGREDIENT,
  };
};

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
