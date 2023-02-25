import React from 'react';
import { Link } from 'react-router-dom';
import styles from './profile-nav-menu.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/users';

export const ProfileNavMenu = () => {
  const linkActive = `${styles.link} ${styles.active} text text_type_main-medium`;

  const dispatch = useDispatch();
  return (
    <ul className={styles.list}>
      <li>
        <Link to={'/profile'} className={linkActive}>
          <p className="text text_type_main-medium text_color_primary">
            Профиль
          </p>
        </Link>
      </li>
      <li>
        <Link to={'/profile/orders'} className={linkActive}>
          <p className={'text text_type_main-medium text_color_primary'}>
            История заказов
          </p>
        </Link>
      </li>
      <li>
        <Link
          to={'/login'}
          onClick={() => dispatch(logoutUser())}
          className={linkActive}
        >
          <p className="text text_type_main-medium text_color_primary">Выход</p>
        </Link>
      </li>
      <p className="text text_type_main-small text_color_inactive mt-20">
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </ul>
  );
};
