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
  const orders = useSelector((store) => store.wsOrders.orders);
  const total = useSelector((store) => store.wsOrders.total);
  const totalToday = useSelector((store) => store.wsOrders.totalToday);
  const location = useLocation();
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
    console.log(orders);
  });

  return (
    <main className={styles.mainGrid}>
      <section className={`${styles.OrdersFeed} mt-10`}>
        <h2 className={'text text_type_main-large mb-5'}>Лента заказов</h2>
        <ul className={styles.orders}>
          <Link
            to={`/feed/1`}
            state={{ background: location }}
            className={styles.emptyStyle}
            key={123}
          >
            <Order id={'1'} />
          </Link>
          <Link
            to={`/feed/2`}
            state={{ background: location }}
            className={styles.emptyStyle}
            key={1234}
          >
            <Order id={'2'} />
          </Link>
        </ul>
      </section>
      <section className={styles.summary}>
        <div className={styles.ordersQueues}>
          <div className={styles.ordersQueueWrapper}>
            <h2 className={`${styles.minorHeader} text text_type_main-medium`}>
              Готовы:
            </h2>
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
            <h2 className={`${styles.minorHeader} text text_type_main-medium`}>
              В работе:
            </h2>
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
          <h2 className={`${styles.minorHeader} text text_type_main-medium`}>
            Выполнено за все время:
          </h2>
          <p className={` ${styles.totalCount} text text_type_digits-large`}>
            {total}
          </p>
        </div>
        <div>
          <h2 className={`${styles.minorHeader} text text_type_main-medium`}>
            Выполнено за сегодня:
          </h2>
          <p className={`${styles.totalCount} text text_type_digits-large `}>
            {totalToday}
          </p>
        </div>
      </section>
    </main>
  );
};
