import {
  SEND_ORDER,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from '../actions/post-order-actions';

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
