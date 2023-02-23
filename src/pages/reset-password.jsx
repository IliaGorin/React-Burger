import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login.module.css';

export const ResetPasswordPage = () => {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">
          Восстановление пароля
        </h1>
        <PasswordInput
          value={'password'}
          placeholder={'Введите новый пароль'}
          name={'password'}
          onChange={console.log('press')}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={''}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          onChange={console.log('press')}
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={console.log('press')}
        >
          Сохранить
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
