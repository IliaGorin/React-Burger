import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './orders-list.module.css';
import { Link, useLocation } from 'react-router-dom';
import Order from '../../components/order/order';
import { useDispatch, useSelector } from 'react-redux';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/actions/ws-actions';

export const OrdersListPage = () => {
  const orders = useSelector((store) => store.wsOrders.allOrders);
  const total = useSelector((store) => store.wsOrders.total);
  const totalToday = useSelector((store) => store.wsOrders.totalToday);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: {
        isAuth: false,
        wsUrl: 'wss://norma.nomoreparties.space/orders/all',
      },
    });
    return () => {
      dispatch({
        type: WS_CONNECTION_STOP,
      });
    };
  }, []);

  useEffect(() => {
    console.log(orders);
  }, []);

  return (
    <main className={styles.mainGrid}>
      <section className={`${styles.ordersFeed} mt-10`}>
        <h2 className={'text text_type_main-large mb-5'}>Лента заказов</h2>
        <ul className={styles.orders}>
          {orders &&
            orders.map((order) => {
              return (
                <li className={styles.listOfOrders} key={order._id}>
                  <Link
                    to={`/feed/${order._id}`}
                    state={{ background: location }}
                    className={styles.linkToOrder}
                  >
                    <Order id={order._id} data={order} />
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>
      <section className={styles.summary}>
        <div className={styles.ordersQueues}>
          <div className={styles.ordersQueueWrapper}>
            <h3 className={`${styles.minorHeader} text text_type_main-medium`}>
              Готовы:
            </h3>
            <ul className={styles.orderQueue}>
              {orders.map((order) =>
                order.status === 'done' ? (
                  <li className={`${styles.readyOrders}`} key={order._id}>
                    <p className="text text_type_digits-default">
                      {order.number}
                    </p>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div className={styles.ordersQueueWrapper}>
            <h3 className={`${styles.minorHeader} text text_type_main-medium`}>
              В работе:
            </h3>
            <ul className={styles.orderQueue}>
              <ul className={styles.orderQueue}>
                {orders.map((order) =>
                  order.status !== 'done' ? (
                    <li className={`${styles.notReadyOrders}`} key={order._id}>
                      <p className="text text_type_digits-default">
                        {order.number}
                      </p>
                    </li>
                  ) : null
                )}
              </ul>
            </ul>
          </div>
        </div>
        <div>
          <h3 className={`${styles.minorHeader} text text_type_main-medium`}>
            Выполнено за все время:
          </h3>
          <p className={` ${styles.totalCount} text text_type_digits-large`}>
            {total}
          </p>
        </div>
        <div>
          <h3 className={`${styles.minorHeader} text text_type_main-medium`}>
            Выполнено за сегодня:
          </h3>
          <p className={`${styles.totalCount} text text_type_digits-large `}>
            {totalToday}
          </p>
        </div>
      </section>
    </main>
  );
};
