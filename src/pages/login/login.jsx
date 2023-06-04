import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/actions/users';
import { getUserInfo } from '../../services/actions/users';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [searchParams] = useSearchParams();

  const redirectRoute = searchParams.get('RedirectTo');

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginUser(email, password, navigate, redirectRoute));
      dispatch(getUserInfo());
    },
    [email, password, navigate, dispatch, redirectRoute]
  );

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
          onClick={handleLogin}
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
    </main>
  );
};
