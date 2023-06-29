import {
  SEND_ORDER,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
  CLEAR_ORDER,
  PostOrderActions,
} from '../actions/post-order-actions';
import { Order } from '../../utils/Types/data';

type State = {
  order: Order | null;
  orderPostProcessing: boolean;
  orderPostFailed: boolean;
};

const initialStatePost: State = {
  order: null,
  orderPostProcessing: false,
  orderPostFailed: false,
};

export const postOrderReducer = (
  state = initialStatePost,
  action: PostOrderActions
): State => {
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
    case CLEAR_ORDER: {
      return {
        ...state,
        order: null,
      };
    }
    default: {
      return state;
    }
  }
};
