import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './error.module.css';

export const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const handlerOnClick = () => {
    navigate('/');
  };

  return (
    <main className={styles.main}>
      <p className="text text_type_main-default text_color_inactive mt-8 mb-8">
        По заданному адресу страницы не существует...
      </p>
      <Button onClick={handlerOnClick} htmlType="button">
        Перейти на главную
      </Button>
    </main>
  );
};
