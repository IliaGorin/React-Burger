import { URL_API } from './constants';
import { checkResponse } from '../services/actions';

function getIngredients() {
  return fetch(`${URL_API}/ingredients`).then(checkResponse);
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
  }).then(checkResponse);
}

export { getIngredients, postOrder };