import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_STOP,
  WS_GET_ORDERS,
} from '../actions/ws-actions';

const initialState = {
  error: undefined,
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_STOP:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        orders: [],
        error: undefined,
        wsConnected: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        wsConnected: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        error: undefined,
      };

    default:
      return state;
  }
};
