import React from 'react';
import ReactDOM from 'react-dom/client';

import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { wsActions } from './services/actions/ws-actions';
import socketMiddleware from './services/middleware/socketMiddleware';

import { rootReducer } from './services/reducers';
import './index.css';
import App from './components/app/app';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
