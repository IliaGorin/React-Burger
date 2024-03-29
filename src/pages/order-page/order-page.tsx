import React, { useEffect, FC } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styles from './order-page.module.css';
import Modal from '../../components/modal/modal';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/Types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/ws-actions';

import OrderInfoModal from '../../components/order-info-modal/order-info-modal';
import { OrdersListPage } from '../orders-list/orders-list';

export const OrderPage: FC = () => {
  const allOrders = useSelector((store) => store.wsOrders.allOrders);
  const userOrders = useSelector((store) => store.wsOrders.userOrders);
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
  }, [dispatch, isAuth, wsUrl]);

  useEffect(() => {
    console.log('order-page has been mounted');
  }, []);

  const navigate = useNavigate();

  const { id } = useParams();

  const order =
    pathname === '/profile/orders'
      ? userOrders.find((element) => element._id === id)
      : allOrders.find((element) => element._id === id);

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
