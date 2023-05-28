import { URL_API } from '../../utils/constants';
import { checkResponse, sendRequest } from './index';

export const SEND_ORDER = 'SEND_ORDER';
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const postOrder = (orderedIngredients) => {
  return (dispatch) => {
    dispatch({
      type: SEND_ORDER,
    });
    const postDetails = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('accessToken'),
      },
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

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER,
    order: null,
  };
};
