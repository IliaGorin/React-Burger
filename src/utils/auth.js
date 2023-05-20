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

//
//
//
//
//
//
//

// attempt with auth through Redux

// import { store } from '..';

// import { sendRequest } from '../services/actions';
// import {
//   GET_USER_INFO,
//   GET_USER_INFO_SUCCESSFUL,
//   refreshTokens,
// } from '../services/actions/users';

// async function checkAuth() {
//   const postDetails = {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: window.localStorage.getItem('accessToken'),
//     },
//   };
//   await sendRequest('/auth/user', postDetails)
//     .then((data) => {
//       if (data.success) {
//         store.dispatch({
//           type: GET_USER_INFO_SUCCESSFUL,
//           email: data.user.email,
//           name: data.user.name,
//         });
//         return store.getState().users.isLoggedIn;
//       }
//       return store.getState().users.isLoggedIn;
//     })
//     .catch((err) => {
//       if (err.message === 'jwt expired') {
//         refreshTokens(redirect);
//         return store.getState().users.isLoggedIn;
//       } else {
//         console.log(err.message);
//         return store.getState().users.isLoggedIn;
//       }
//       // return store.getState().users.isLoggedIn;
//     });
//   // console.log(store.getState().users);
//   // return true;
// }

// export async function checkAuthLoader({ request }) {
//   const pathname = new URL(request.url).pathname;

//   const checkAuthFun = async () => {
//     const isLoggedIn = await checkAuth();
//     console.log(isLoggedIn);
//     if (!isLoggedIn) {
//       console.log('you are not authorized');
//       return redirect(`/login?RedirectTo=${pathname}`);
//     }
//     if (isLoggedIn) {
//       console.log('you are authorized');
//       return null;
//     }
//     return null;
//   };
//   await checkAuthFun();
//   return null;
// }

// export async function checkNotAuthLoader() {
//   const isLoggedIn = await checkAuth();
//   if (isLoggedIn) {
//     return redirect('/');
//   }
//   return null;
// }
