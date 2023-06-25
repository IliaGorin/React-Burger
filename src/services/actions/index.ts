import { URL_API } from '../../utils/constants';
import { PostDetails, Response } from '../../utils/Types/data';

export function sendRequest(url: string, options: PostDetails) {
  return fetch(`${URL_API}${url}`, options).then(checkResponse);
}

export const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: Response) => Promise.reject(err));
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
