import { sendRequest } from './index';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESSFUL = 'FORGOT_PASSWORD_SUCCESSFUL';
export const REGISTER_USER_SUCCESSFUL = 'REGISTER_USER_SUCCESSFUL';
export const REGISTER_USER = 'REGISTER_USER';

export const changePasswordRequest = (email, history) => {
  return (dispatch) => {
    dispatch({
      type: FORGOT_PASSWORD,
    });
    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    };
    dispatch({
      type: FORGOT_PASSWORD_SUCCESSFUL,
    });
    sendRequest(`/password-reset`, postDetails)
      .then((data) => {
        if (data.success) {
          return history.replace({ pathname: '/reset-password' });
        }
        return null;
      })
      .catch((error) => {
        alert('Ошибка, код ошибки: ', error.type);
      });
  };
};

export const registerUser = (name, email, password, navigate) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER,
      email: email,
      password: password,
      name: name,
    });
    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        name: `${name}`,
      }),
    };
    dispatch({
      type: REGISTER_USER_SUCCESSFUL,
    });
    sendRequest(`/auth/register`, postDetails)
      .then((data) =>
        data.success ? navigate('/login') : alert('Укажите корректную почту')
      )
      .catch((error) => {
        alert('Ошибка, код ошибки: ', error.type);
      });
  };
};
