import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('refreshToken');
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  console.log(token);
  if (!token) {
    return redirect('/login');
  }
  return null;
}
