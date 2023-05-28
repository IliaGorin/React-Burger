import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import styles from './order-page.module.css';
import Modal from '../../components/modal/modal';

import { useNavigate } from 'react-router-dom';
import Order from '../../components/order/order';
import { OrdersListPage } from '../orders-list/orders-list';

export const OrderPage = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const { id } = useParams();

  const background = location.state && location.state.background;

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <main className={styles.wrapper}>
      {background ? (
        <>
          {background.pathname === '/feed' ? <OrdersListPage /> : undefined}
          <Modal closeModal={closeModal} title="">
            <Order id={id} />
          </Modal>
        </>
      ) : (
        <>
          <h1 className="text_type_main-large">Станица с заказом</h1>
          <Order id={id} />
        </>
      )}
    </main>
  );
};
