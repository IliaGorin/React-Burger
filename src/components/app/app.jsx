import { React, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../../pages/root';
import HomePage from '../../pages/home';
import { LoginPage } from '../../pages/login';

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
