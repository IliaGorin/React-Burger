import React, {
  useState,
  useCallback,
  useEffect,
  FC,
  FormEvent,
  MouseEventHandler,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './reset-password.module.css';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch, useSelector } from '../../utils/Types';
import { resetPassword } from '../../services/actions/users';

export const ResetPasswordPage: FC = () => {
  const navigate = useNavigate();
  const successEmail = useSelector((state) => state.users.success);

  useEffect(() => {
    if (!successEmail) {
      return navigate('/');
    }
  });

  const dispatch = useDispatch();
  const [form, setValue] = useState({ password: '', token: '' });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handlerResetPassword: MouseEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(resetPassword(form, navigate));
      setValue({ password: '', token: '' });
    },
    [form, dispatch, navigate]
  );

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handlerResetPassword}>
        <h1 className="text text_type_main-medium text_color_primary">
          Восстановление пароля
        </h1>
        <PasswordInput
          value={form.password}
          placeholder={'Введите новый пароль'}
          name={'password'}
          onChange={onChange}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          value={form.token}
          name={'token'}
          error={false}
          errorText={'Ошибка'}
          onChange={onChange}
        />
        <Button htmlType="submit" type="primary" size="medium">
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
