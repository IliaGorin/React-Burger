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
    <main className={styles.wrapper}>
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
        <div className={styles.emptyStyle}>
          <div className={styles.emptyStyle}>
            <h2 className={styles.emptyStyle}>Готовы:</h2>
            <ul className={styles.emptyStyle}>
              <li className={styles.emptyStyle} key={123}>
                <div>Заказ №1</div>
              </li>
            </ul>
          </div>
          <div className={styles.emptyStyle}>
            <h2 className={styles.emptyStyle}>В работе:</h2>
            <ul className={styles.emptyStyle}>
              <li className={styles.emptyStyle} key={123}>
                <div>Заказ №1</div>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className={styles.emptyStyle}>Выполнено за все время:</h2>
          <p className={` ${styles.emptyStyle} text text_type_digits-large`}>
            1234
          </p>
        </div>
        <div>
          <h2 className={styles.emptyStyle}>Выполнено за сегодня:</h2>
          <p className={`${styles.emptyStyle} text text_type_digits-large `}>
            12331
          </p>
        </div>
      </section>
    </main>
  );
};
