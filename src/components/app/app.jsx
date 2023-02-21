import { React } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../../pages/root';
import HomePage from '../../pages/home';
import { LoginPage } from '../../pages/login';
import { RegistrationPage } from '../../pages/registation';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
