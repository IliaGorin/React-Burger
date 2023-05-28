import { sendRequest, refreshTokens } from './index';

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
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_USER_SUCCESSFUL = 'LOGOUT_USER_SUCCESSFUL';
export const REFRESH_USER = 'REFRESH_USER';
export const REFRESH_USER_SUCCESS = 'REFRESH_USER_SUCCESS';

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
      .catch((err) => alert(`'Ошибка, код ошибки: ', ${err.message}`));
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
      .catch((err) => alert(`'Ошибка, код ошибки: ', ${err.message}`));
  };
};

export const resetPassword = (form, navigate) => {
  const { password, token } = form;
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
    sendRequest('/password-reset/reset', postDetails)
      .then(() => navigate('/'))
      .catch((err) => alert(`'Ошибка, код ошибки: ', ${err.message}`));
  };
};

export const loginUser = (email, password, navigate, redirectRoute) => {
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
    sendRequest('/auth/login', postDetails)
      .then((data) => {
        if (data.success) {
          dispatch({
            type: LOGIN_USER_SUCCESSFUL,
            name: data.user.name,
            email: data.user.email,
          });
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          navigate(redirectRoute);
        }
      })
      .catch((err) => alert(`'Ошибка, код ошибки: ', ${err.message}`));
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
          console.log('data.success');
          localStorage.setItem('isLoggedIn', true);
          dispatch({
            type: GET_USER_INFO_SUCCESSFUL,
            email: data.user.email,
            name: data.user.name,
          });
        }
      })
      .catch((err) => {
        if (err.message === 'jwt expired') {
          refreshTokens()
            .then((data) => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);
              localStorage.setItem('isLoggedIn', true);
              console.log('tokes has been refreshed');
            })
            .then(() => {
              dispatch(getUserInfo());
            })
            .catch((err) => {
              if (err.message === 'Token is invalid') {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                window.localStorage.removeItem('isLoggedIn');
                alert(`'Ошибка, код ошибки: ', ${err.message}`);
              } else {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                window.localStorage.removeItem('isLoggedIn');
                console.log(err);
              }
            });
        } else {
          window.localStorage.removeItem('isLoggedIn');
          console.log(err.message);
        }
      });
  };
};

export const patchUserInfo = (name, email, password) => {
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
        password: password,
      }),
    };
    sendRequest('/auth/user', postDetails)
      .then(() =>
        dispatch({
          type: PATCH_USER_INFO_SUCCESSFUL,
        })
      )
      .catch((err) => {
        if (err.message === 'jwt expired') {
          refreshTokens()
            .then((data) => {
              localStorage.setItem('accessToken', data.accessToken);
              localStorage.setItem('refreshToken', data.refreshToken);
              localStorage.setItem('isLoggedIn', true);
              console.log('tokes has been refreshed');
            })
            .then(() => {
              dispatch(patchUserInfo(name, email, password));
            })
            .catch((err) => {
              if (err.message === 'Token is invalid') {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                window.localStorage.removeItem('isLoggedIn');
                alert(`'Ошибка, код ошибки: ', ${err.message}`);
              } else {
                window.localStorage.removeItem('accessToken');
                window.localStorage.removeItem('refreshToken');
                window.localStorage.removeItem('isLoggedIn');
                console.log(err);
              }
            });
        } else {
          window.localStorage.removeItem('isLoggedIn');
          console.log(err.message);
        }
      });
  };
};

export const logoutUser = (navigate, pathname) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER,
    });

    const postDetails = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    };
    sendRequest('/auth/logout', postDetails)
      .then((data) => {
        if (data.success) {
          window.localStorage.removeItem('accessToken');
          window.localStorage.removeItem('refreshToken');
          window.localStorage.removeItem('isLoggedIn');
          dispatch({
            type: LOGOUT_USER_SUCCESSFUL,
          });
          navigate(`/`);
        }
      })
      .catch((err) => alert(`'Ошибка, код ошибки: ', ${err.message}`));
  };
};