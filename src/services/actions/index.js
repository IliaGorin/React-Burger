import { URL_API } from '../../utils/constants';

export function sendRequest(url, options) {
  return fetch(`${URL_API}${url}`, options).then(checkResponse);
}

export const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
