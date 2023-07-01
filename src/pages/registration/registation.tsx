import React, {
  useState,
  useCallback,
  FC,
  FormEvent,
  MouseEventHandler,
} from 'react';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './registration.module.css';
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../utils/Types';
import { registerUser } from '../../services/actions/users';
import { useNavigate } from 'react-router-dom';

export const RegistrationPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleRegister: MouseEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(registerUser(form.name, form.email, form.password, navigate));
    },
    [dispatch, form, navigate]
  );

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h1 className="text text_type_main-medium text_color_primary">
          Регистрация
        </h1>
        <Input
          value={form.name}
          name={'name'}
          type={'text'}
          placeholder={'Имя'}
          error={false}
          errorText={'Ошибка'}
          onChange={onChange}
        />
        <EmailInput
          value={form.email}
          name={'email'}
          isIcon={false}
          onChange={onChange}
        />
        <PasswordInput
          value={form.password}
          name={'password'}
          onChange={onChange}
        />
        <Button htmlType="submit" type="primary" size="medium">
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
