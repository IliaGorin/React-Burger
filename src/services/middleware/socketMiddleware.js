const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onGetOrder } =
        wsActions;

      if (type === wsInit) {
        let token = window.localStorage.getItem('accessToken');
        token = token.substring(7);
        const wsUrl = payload.isAuth
          ? payload.wsUrl + `?token=${token}`
          : payload.wsUrl;

        console.log(wsUrl + `?token=${token}`);
        socket = new WebSocket(wsUrl);

        socket.onopen = (event) => {
          console.log('ws connect');
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onGetOrder, payload: parsedData });
        };
      }
      if (wsClose && type === wsClose && socket) {
        console.log('ws disconnect');
        socket.close();
      }
      next(action);
    };
  };
};

export default socketMiddleware;
