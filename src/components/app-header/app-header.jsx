import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForAppHeader from './app-header.module.css';
import { Link } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <header className={stylesForAppHeader.header}>
      <nav className={stylesForAppHeader.nav}>
        <ul className={stylesForAppHeader.navList}>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <Link to="/" className={stylesForAppHeader.link}>
              <BurgerIcon type="primary" />
              <span className="ml-2 text text_type_main-default">
                Конструктор
              </span>
            </Link>
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
        <Link to="/login" className={stylesForAppHeader.link}>
          <ProfileIcon type="secondary" />
          <span className="ml-2 text text_type_main-default text_color_inactive">
            Личный кабинет
          </span>
        </Link>
      </nav>
    </header>
  );
};
