const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onGetOrder } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(wsUrl);

        socket.onopen = (event) => {
          console.log('connection success', type);
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = (event) => {
          console.log('get orders', type);
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onGetOrder, payload: parsedData });
        };
      }
      if (wsClose && type === wsClose && socket) {
        socket.close();
      }
      next(action);
    };
  };
};

export default socketMiddleware;