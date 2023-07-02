import { URL_API } from '../../utils/constants';
import { checkResponse, sendRequest } from './index';
import { Ingredient } from '../../utils/Types/data';
import { AppDispatch } from '../../utils/Types';

export const SEND_ORDER: 'SEND_ORDER' = 'SEND_ORDER';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_FAILED: 'SEND_ORDER_FAILED' = 'SEND_ORDER_FAILED';
export const CLEAR_ORDER: 'CLEAR_ORDER' = 'CLEAR_ORDER';

export type OrderRequest = {
  readonly type: typeof SEND_ORDER;
};

export type OrderSuccess = {
  readonly type: typeof SEND_ORDER_SUCCESS;
  order: number | null;
};

export type OrderError = {
  readonly type: typeof SEND_ORDER_FAILED;
};

export interface OrderClear {
  readonly type: typeof CLEAR_ORDER;
  order: null;
}

export const clearOrder = () => {
  return {
    type: CLEAR_ORDER,
    order: null,
  };
};

export type PostOrderActions =
  | OrderRequest
  | OrderSuccess
  | OrderError
  | OrderClear;

export const postOrder = (orderedIngredients: Array<Ingredient>) => {
  return function (dispatch: AppDispatch) {
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
