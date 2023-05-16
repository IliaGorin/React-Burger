import { redirect } from 'react-router-dom';
import { getUserInfo } from '../services/actions/users';

export function getAuthToken() {
  const token = localStorage.getItem('refreshToken');
  return token;
}

export function checkAuthLoader({ request }) {
  const pathname = new URL(request.url).pathname;
  const token = getAuthToken();
  if (!token) {
    return redirect(`/login?RedirectTo=${pathname}`);
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
