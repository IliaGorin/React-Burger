import { URL_API } from './constants';

function getIngredients() {
  return fetch(`${URL_API}/ingredients`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

function postOrder(orderedIngredients) {
  return fetch(`${URL_API}/orders`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ingredients: orderedIngredients,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  });
}

export { getIngredients, postOrder };
