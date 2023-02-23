import React from 'react';
import {
  Input,
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './profile.module.css';
import { ProfileNavMenu } from '../components/profile-nav-menu/profile-nav-menu';

export const ProfilePage = () => {
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
          onChange={console.log('')}
          value={'name'}
          name={'name'}
          type={'text'}
          placeholder={'Имя'}
          icon={'EditIcon'}
          error={false}
        />
        <EmailInput
          onChange={console.log('')}
          value={'email'}
          name="email"
          icon="EditIcon"
        />
        <PasswordInput
          onChange={console.log('')}
          value={'password'}
          name={'password'}
          icon={'EditIcon'}
        />
        <div className={styles.buttonWrapper}>
          <Button
            onClick={console.log('')}
            type={'secondary'}
            size={'medium'}
            htmlType={'button'}
          >
            Отмена
          </Button>
          <Button type={'primary'} size={'medium'} htmlType={'submit'}>
            Сохранить
          </Button>
        </div>
      </form>
    </main>
  );
};
