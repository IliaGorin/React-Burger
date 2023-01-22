import { URL_API } from '../../utils/constants';

export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`error ${res}`);
}

export function sendRequest(url, options) {
  return fetch(`${URL_API}${url}`, options).then(checkResponse);
}
