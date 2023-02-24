import { sendRequest } from './index';

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_SUCCESSFUL = 'FORGOT_PASSWORD_SUCCESSFUL';
export const REGISTER_USER_SUCCESSFUL = 'REGISTER_USER_SUCCESSFUL';
export const REGISTER_USER = 'REGISTER_USER';
export const RESET_PASSWORD_SUCCESSFUL = 'RESET_PASSWORD_SUCCESSFUL';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESSFUL = 'LOGIN_USER_SUCCESSFUL';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESSFUL = 'GET_USER_INFO_SUCCESSFUL';
export const PATCH_USER_INFO = 'PATH_USER_INFO';
export const PATCH_USER_INFO_SUCCESSFUL = 'PATH_USER_INFO_SUCCESSFUL';

export const changePasswordRequest = (email, navigate) => {
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
          return navigate('/reset-password');
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

export const resetPassword = (password, token) => {
  return (dispatch) => {
    dispatch({
      type: RESET_PASSWORD,
      token: token,
    });
    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password, token: token }),
    };
    dispatch({
      type: RESET_PASSWORD_SUCCESSFUL,
    });
    sendRequest('/password-reset/reset', postDetails).catch((error) =>
      alert('Ошибка, код ошибки: ', error.type)
    );
  };
};

export const loginUser = (email, password, navigate) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER,
      email: email,
      password: password,
    });
    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
    };
    dispatch({
      type: LOGIN_USER_SUCCESSFUL,
    });
    sendRequest('/auth/login', postDetails)
      .then((data) => {
        if (data.success) {
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          navigate('/');
        }
      })
      .catch((error) => alert('Ошибка, код ошибки: ', error.type));
  };
};

export const getUserInfo = () => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_INFO,
    });
    const postDetails = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('accessToken'),
      },
    };
    sendRequest('/auth/user', postDetails)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: GET_USER_INFO_SUCCESSFUL,
            email: data.user.email,
            name: data.user.name,
          });
        }
      })
      .catch((error) => alert('Ошибка, код ошибки: ', error.type));
  };
};

export const patchUserInfo = (email, name) => {
  return (dispatch) => {
    dispatch({
      type: PATCH_USER_INFO,
      email: email,
      name: name,
    });
    const postDetails = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    };
    dispatch({
      type: PATCH_USER_INFO_SUCCESSFUL,
    });
    sendRequest('/auth/user', postDetails).catch((error) =>
      alert('Ошибка, код ошибки: ', error.type)
    );
  };
};
