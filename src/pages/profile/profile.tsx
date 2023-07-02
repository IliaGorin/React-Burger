import React, { useEffect, useState, FC, FormEvent } from 'react';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { ProfileNavMenu } from '../../components/profile-nav-menu/profile-nav-menu';
import { getUserInfo, patchUserInfo } from '../../services/actions/users';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector, useDispatch } from '../../utils/Types';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { name, email, password, isLoggedIn } = useSelector(
    (store) => store.users
  );

  const initialState = {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
  };
  const [form, setValue] = useState(initialState);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(`/login`);
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    setValue({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleUpdateUserInfo = () => {
    dispatch(patchUserInfo(form.name, form.email, form.password));
  };

  const handleResetUserInfo = () => {
    setValue(initialState);
  };

  return (
    { isLoggedIn } && (
      <main className={styles.wrapper}>
        <ProfileNavMenu caption="В этом разделе вы можете изменить свои персональные данные" />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            onChange={onChange}
            value={form.name}
            name={'name'}
            type={'text'}
            placeholder={'Имя'}
            icon={'EditIcon'}
            error={false}
          />
          <EmailInput onChange={onChange} value={form.email} name="email" />
          <PasswordInput
            onChange={onChange}
            value={form.password}
            name={'password'}
            icon={'EditIcon'}
          />
          <div className={styles.buttonWrapper}>
            <Button
              onClick={handleResetUserInfo}
              type={'secondary'}
              size={'medium'}
              htmlType={'button'}
            >
              Отмена
            </Button>
            <Button
              onClick={handleUpdateUserInfo}
              type={'primary'}
              size={'medium'}
              htmlType={'submit'}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </main>
    )
  );
};
