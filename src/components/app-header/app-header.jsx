import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForAppHeader from './app-header.module.css';
import { NavLink } from 'react-router-dom';

export const AppHeader = () => {
  const activeLinkStyle = `${stylesForAppHeader.link} text_type_main-default`;
  const inactiveLinkStyle = `${stylesForAppHeader.link} text_type_main-default text_color_inactive`;
  return (
    <header className={stylesForAppHeader.header}>
      <nav className={stylesForAppHeader.nav}>
        <ul className={stylesForAppHeader.navList}>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeLinkStyle : inactiveLinkStyle
              }
            >
              <BurgerIcon type="primary" />
              <span className="ml-2 text">Конструктор</span>
            </NavLink>
          </li>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <a href="/#" className={stylesForAppHeader.link}>
              <ListIcon type="secondary" />
              <span className="ml-2 text text_type_main-default text_color_inactive">
                Лента заказов
              </span>
            </a>
          </li>
        </ul>
        <Logo />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          <ProfileIcon type="secondary" />
          <span className="ml-2 text">Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
};
