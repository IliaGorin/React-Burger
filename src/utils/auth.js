import { redirect } from 'react-router-dom';

export function getAuthToken() {
  const token = localStorage.getItem('refreshToken');
  return token;
}

export function checkAuthLoader({ request }) {
  const url = new URL(request.url);
  console.log(url);
  const pathname = url.pathname;
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
