import React, { useState } from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';

export const RegistrationPage = () => {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <h1 className="text text_type_main-medium text_color_primary">
          Регистрация
        </h1>
        <Input
          onChange={console.log('press')}
          value={''}
          name={'name'}
          type={'text'}
          placeholder={'Имя'}
          error={false}
          errorText={'Ошибка'}
        />
        <EmailInput
          onChange={console.log('press')}
          value={''}
          name={'email'}
          isIcon={false}
        />
        <PasswordInput
          onChange={console.log('press')}
          value={''}
          name={'password'}
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={console.log('press')}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{' '}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </main>
  );
};
