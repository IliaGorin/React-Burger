import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './profile-nav-menu.module.css';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/actions/users';

export const ProfileNavMenu = ({ caption }) => {
  const activeLinkStyle = `${styles.link} ${styles.active} text text_type_main-medium`;
  const inactiveLinkStyle = `${styles.link} text_type_main-default text_color_inactive`;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <ul className={styles.list}>
      <li>
        <NavLink
          to={'/profile'}
          end
          className={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          <p className="text text_type_main-medium">Профиль</p>
        </NavLink>
      </li>
      <li>
        <NavLink
          to={'/profile/orders'}
          className={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          <p className={'text text_type_main-medium'}>История заказов</p>
        </NavLink>
      </li>
      <li>
        <button
          onClick={() => dispatch(logoutUser(navigate))}
          className={styles.button}
        >
          <p className="text text_type_main-medium">Выход</p>
        </button>
      </li>
      <p className="text text_type_main-small text_color_inactive mt-20">
        {caption}
      </p>
    </ul>
  );
};
