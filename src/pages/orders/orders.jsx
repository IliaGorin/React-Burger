import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './orders.module.css';
import { ProfileNavMenu } from '../../components/profile-nav-menu/profile-nav-menu';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const handlerOnClick = () => {
    navigate('/');
  };

  return (
    <main className={styles.wrapper}>
      <ProfileNavMenu caption="В этом разделе вы можете просмотреть свою историю заказов" />
      <div className={styles.main}>
        <p className="text text_type_main-default text_color_inactive mt-8 mb-8">
          Лента заказов
        </p>
        <Button onClick={handlerOnClick} htmlType="button">
          Перейти на главную
        </Button>
      </div>
    </main>
  );
};
