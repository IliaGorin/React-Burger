import { redirect } from 'react-router-dom';
import { store } from '..';

export function checkAuthLoader({ request }) {
  const pathname = new URL(request.url).pathname;

  const isLoggedIn = store.getState().users.isLoggedIn;
  console.log(store.getState().users);
  if (!isLoggedIn) {
    console.log('you are not authorized');
    return redirect(`/login?RedirectTo=${pathname}`);
  }
  if (isLoggedIn) {
    console.log('you are authorized');
    return null;
  }
}

export function checkNotAuthLoader() {
  const isLoggedIn = store.getState().users.isLoggedIn;
  if (isLoggedIn) {
    return redirect('/');
  }
  return null;
}
