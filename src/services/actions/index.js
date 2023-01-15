import { URL_API } from '../../utils/constants';

export const INGREDIENTS = 'INGREDIENTS';
export const CURRENT_INGREDIENTS = 'CURRENT_INGREDIENTS';
export const BROWSED_INGREDIENT = 'BROWSED_INGREDIENT';
export const CREATED_ORDER = 'CREATED_ORDER';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';

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
