import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForAppHeader from './app-header.module.css';
import { Link, NavLink, useMatch } from 'react-router-dom';

export const AppHeader = () => {
  const isConstructor = !!useMatch({ path: '/', end: true });
  const isOrders = !!useMatch({ path: '/feed' });
  const isProfile = !!useMatch({ path: '/profile', end: false });

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
              <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
              <span className="ml-2 text">Конструктор</span>
            </NavLink>
          </li>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <NavLink
              to="/feed"
              className={({ isActive }) =>
                isActive ? activeLinkStyle : inactiveLinkStyle
              }
            >
              <ListIcon type={isOrders ? 'primary' : 'secondary'} />
              <span className="ml-2 text">Лента заказов</span>
            </NavLink>
          </li>
        </ul>
        <Link to="/">
          <Logo />
        </Link>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
          <span className="ml-2 text">Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
};
