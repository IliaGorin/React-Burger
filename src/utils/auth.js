import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('refreshToken');
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect('/login');
  }
  return null;
}

export function checkNotAuthLoader() {
  const token = getAuthToken();
  if (token) {
    return redirect('/');
  }
  return null;
}
