import React, { useEffect, useState } from 'react';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { ProfileNavMenu } from '../components/profile-nav-menu/profile-nav-menu';
import { getUserInfo, patchUserInfo } from '../services/actions/users';
import { useSelector, useDispatch } from 'react-redux';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const { name, email, password } = useSelector((store) => store.users);

  const initialState = {
    name: `${name}`,
    email: `${email}`,
    password: `${password}`,
  };
  const [form, setValue] = useState(initialState);

  useEffect(() => {
    dispatch(getUserInfo());
    setValue(form);
  }, [form, name, email, password]);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdateUserInfo = () => {
    dispatch(patchUserInfo(form.email, form.name));
  };

  const handleResetUserInfo = () => {
    setValue(initialState);
  };

  return (
    <main className={styles.wrapper}>
      <ProfileNavMenu />
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
        <EmailInput
          onChange={onChange}
          value={form.email}
          name="email"
          icon="EditIcon"
        />
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
  );
};
