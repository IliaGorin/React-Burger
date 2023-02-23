import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePasswordRequest } from '../services/actions/users';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleRequest = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(changePasswordRequest(email, navigate));
    },
    [dispatch, email]
  );

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">
          Восстановление пароля
        </h1>
        <EmailInput
          onChange={onChange}
          value={email}
          placeholder={'Укажите e-mail'}
          name={'email'}
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleRequest}
        >
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
