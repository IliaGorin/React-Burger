import { redirect } from 'react-router-dom';

export function checkAuthLoader({ request }) {
  const pathname = new URL(request.url).pathname;

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log(isLoggedIn);
  if (!isLoggedIn) {
    console.log('you are not authorized');
    return redirect(`/login?RedirectTo=${pathname}`);
  }
  if (isLoggedIn) {
    console.log('you are authorized');
    return null;
  }
  return null;
}

export function checkNotAuthLoader() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn) {
    return redirect('/');
  }
  return null;
}
