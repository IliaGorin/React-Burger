import { React } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../../pages/root';
import HomePage from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegistrationPage } from '../../pages/registation';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ProfilePage } from '../../pages/profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/registration',
        element: <RegistrationPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/reset-password',
        element: <ResetPasswordPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
