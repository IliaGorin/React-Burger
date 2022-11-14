import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForAppHeader from './app-header.module.css';

export const AppHeader = () => {
  return (
    <header className={stylesForAppHeader.header}>
      <nav className={stylesForAppHeader.nav}>
        <ul className={stylesForAppHeader.navList}>
          <li className="pt-4 pr-5 pb-4 pl-5">
            <a href="/#" className={stylesForAppHeader.link}>
              <BurgerIcon type="primary" />
              <span className="ml-2 text text_type_main-default">
                Конструктор
              </span>
            </a>
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
        <a href="/#" className={stylesForAppHeader.link}>
          <ProfileIcon type="secondary" />
          <span className="ml-2 text text_type_main-default text_color_inactive">
            Личный кабинет
          </span>
        </a>
      </nav>
    </header>
  );
};
