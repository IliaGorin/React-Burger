import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

export const ForgotPasswordPage = () => {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">
          Восстановление пароля
        </h1>
        <EmailInput
          value={'email'}
          placeholder={'Укажите e-mail'}
          name={'email'}
          onChange={console.log('press')}
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={console.log('press')}
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
