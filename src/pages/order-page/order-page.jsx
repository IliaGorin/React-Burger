import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './order-page.module.css';
import Modal from '../../components/modal/modal';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/ws-actions';
import Order from '../../components/order/order';
import { OrdersListPage } from '../orders-list/orders-list';

export const OrderPage = () => {
  const orders = useSelector((store) => store.wsOrders.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {},
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

  const location = useLocation();

  const { id } = useParams();

  const background = location.state && location.state.background;

  const order = orders.find((element) => element._id === id);

  const closeModal = () => {
    navigate(-1);
  };

  useEffect(() => {
    console.log(order, 'order in order-page');
  }, []);
  return (
    <main className={styles.wrapper}>
      {background ? (
        <>
          {background.pathname === '/feed' ? <OrdersListPage /> : undefined}
          <Modal closeModal={closeModal} title="">
            {order && <Order data={order} />}
            {/* <Order data={order} /> */}
          </Modal>
        </>
      ) : (
        <>
          <h1 className="text_type_main-large">Станица с заказом</h1>
          {/* <Order data={order} /> */}
          {order && <Order data={order} />}
        </>
      )}
    </main>
  );
};
