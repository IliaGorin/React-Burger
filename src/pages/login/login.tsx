import React, { useState, useCallback, FC, MouseEventHandler } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../utils/Types';
import { loginUser } from '../../services/actions/users';
import { getUserInfo } from '../../services/actions/users';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');

  const [searchParams] = useSearchParams();

  const redirectRoute = searchParams.get('RedirectTo') as string;

  const handleLogin: MouseEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginUser(email, password, navigate, redirectRoute));
      dispatch(getUserInfo());
    },
    [email, password, navigate, dispatch, redirectRoute]
  );

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className="text text_type_main-medium text_color_primary">Вход</h1>
        <EmailInput
          value={email}
          name={'email'}
          isIcon={false}
          onChange={(event) => setEmail(event.target.value)}
        />
        <PasswordInput
          value={password}
          name={'password'}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button htmlType="submit" type="primary" size="medium">
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
