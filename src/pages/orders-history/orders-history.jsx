import React, { useEffect } from 'react';
import Order from '../../components/order/order';
import styles from './orders-history.module.css';
import { ProfileNavMenu } from '../../components/profile-nav-menu/profile-nav-menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/ws-actions';

export const OrdersHistoryPage = () => {
  const orders = useSelector((store) => store.wsOrders.userOrders);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        isAuth: true,
        wsUrl: 'wss://norma.nomoreparties.space/orders',
      },
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, []);

  return (
    <main className={styles.wrapper}>
      <ProfileNavMenu caption="В этом разделе вы можете просмотреть свою историю заказов" />
      <div className={styles.orders}>
        {orders &&
          orders.map((order) => {
            return (
              <li className={styles.listOfOrders} key={order._id}>
                <Link
                  to={`/profile/orders/${order._id}`}
                  state={{ background: location }}
                  className={styles.linkToOrder}
                >
                  <Order id={order._id} data={order} />
                </Link>
              </li>
            );
          })}
      </div>
    </main>
  );
};
