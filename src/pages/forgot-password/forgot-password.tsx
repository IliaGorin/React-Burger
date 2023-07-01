import React, { useState, useCallback, FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './forgot-password.module.css';
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../utils/Types';
import { useNavigate } from 'react-router-dom';
import { changePasswordRequest } from '../../services/actions/users';

export const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleRequest: MouseEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(changePasswordRequest(email, navigate));
    },
    [dispatch, email, navigate]
  );

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleRequest}>
        <h1 className="text text_type_main-medium text_color_primary">
          Восстановление пароля
        </h1>
        <EmailInput
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          placeholder={'Укажите e-mail'}
          name={'email'}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{' '}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};
