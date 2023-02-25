import { React } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../../pages/root';
import HomePage from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegistrationPage } from '../../pages/registation';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';
import { ErrorPage } from '../../pages/error';
import { checkAuthLoader, checkNotAuthLoader } from '../../utils/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/login',
        element: <LoginPage />,
        loader: checkNotAuthLoader,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
        loader: checkNotAuthLoader,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
        loader: checkNotAuthLoader,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
        loader: checkNotAuthLoader,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
        loader: checkAuthLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
