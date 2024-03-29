import { OrderType } from '../../utils/Types/data';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_STOP: 'WS_CONNECTION_STOP' = 'WS_CONNECTION_STOP';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
  'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
  'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export type WsSocketMiddlewareActions = {
  readonly wsInit: typeof WS_CONNECTION_START;
  readonly wsClose: typeof WS_CONNECTION_STOP;
  readonly onOpen: typeof WS_CONNECTION_SUCCESS;
  readonly onError: typeof WS_CONNECTION_ERROR;
  readonly onClose: typeof WS_CONNECTION_CLOSED;
  readonly onGetOrder: typeof WS_GET_ORDERS;
};

export const wsActions: WsSocketMiddlewareActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onError: WS_CONNECTION_ERROR,
  onClose: WS_CONNECTION_CLOSED,
  onGetOrder: WS_GET_ORDERS,
};

export type WsConnectionStart = {
  type: typeof WS_CONNECTION_START;
  payload: {
    isAuth: boolean;
    wsUrl: string;
  };
};

export type WsConnectionStop = {
  type: typeof WS_CONNECTION_STOP;
  payload?: Event;
};

export type WsConnectionSuccess = {
  type: typeof WS_CONNECTION_SUCCESS;
  payload?: Event;
};

export type WsConnectionError = {
  type: typeof WS_CONNECTION_ERROR;
  payload?: Event;
};

export type WsConnectionClosed = {
  type: typeof WS_CONNECTION_CLOSED;
  payload?: Event;
};

export type WSGetOrders = {
  readonly type: typeof WS_GET_ORDERS;
  payload: {
    orders: Array<OrderType>;
    total: number;
    totalToday: number;
    length: number;
    isAuth?: boolean;
  };
};

export type WsActions =
  | WsConnectionStart
  | WsConnectionStop
  | WsConnectionSuccess
  | WsConnectionError
  | WsConnectionClosed
  | WSGetOrders;
