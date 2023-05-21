import { URL_API } from '../../utils/constants';

export function sendRequest(url, options) {
  return fetch(`${URL_API}${url}`, options).then(checkResponse);
}

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function refreshTokens() {
  const postDetails = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  };
  const url = '/auth/token';

  return fetch(`${URL_API}${url}`, postDetails).then(checkResponse);
}
