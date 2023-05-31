import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './order-page.module.css';
import Modal from '../../components/modal/modal';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/ws-actions';

import OrderInfoModal from '../../components/order-info-modal/order-info-modal';
import { OrdersListPage } from '../orders-list/orders-list';

export const OrderPage = () => {
  const orders = useSelector((store) => store.wsOrders.orders);
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;
  let isAuth = false;
  let wsUrl = 'wss://norma.nomoreparties.space/orders/all';

  if (background?.pathname === '/profile/orders') {
    isAuth = true;
    wsUrl = 'wss://norma.nomoreparties.space/orders';
  }
  const pathname = location.pathname.slice(0, 15);
  if (background === null && pathname === '/profile/orders') {
    isAuth = true;
    wsUrl = 'wss://norma.nomoreparties.space/orders';
  }
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        isAuth: isAuth,
        wsUrl: wsUrl,
      },
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, []);

  useEffect(() => {
    console.log('order-page has been mounted');
  }, []);

  const navigate = useNavigate();

  const { id } = useParams();

  const order = orders.find((element) => element._id === id);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <>
      {background ? (
        <>
          {background.pathname === '/feed' ? <OrdersListPage /> : undefined}
          {background.pathname === '/profile/orders' ? (
            <OrdersHistoryPage />
          ) : undefined}
          <Modal closeModal={closeModal} title="">
            {order && <OrderInfoModal data={order} />}
          </Modal>
        </>
      ) : (
        <div className={styles.wrapper}>
          {order && <OrderInfoModal data={order} />}
        </div>
      )}
    </>
  );
};
