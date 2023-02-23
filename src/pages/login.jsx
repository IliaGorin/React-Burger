import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">Вход</h1>
        <EmailInput
          value={email}
          name={'email'}
          isIcon={false}
          onChange={onChangeEmail}
        />
        <PasswordInput
          value={password}
          name={'password'}
          onChange={onChangePassword}
        />
        <Button
          onClick={console.log('press')}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь?{' '}
        <Link to="/registration" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{' '}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Временно
        <Link to="/reset-password" className={styles.link}>
          Страницы для нового пароля
        </Link>
      </p>
    </main>
  );
};
