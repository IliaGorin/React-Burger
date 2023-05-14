import { React, useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../../pages/root/root';
import HomePage from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegistrationPage } from '../../pages/registration/registation';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ErrorPage } from '../../pages/error/error';
import { checkAuthLoader, checkNotAuthLoader } from '../../utils/auth';
import { OrdersPage } from '../../pages/orders/orders';
import { OrdersListPage } from '../../pages/orders-list/orders-list';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { getIngredients } from '../../services/actions/get-ingredients-actions';
import { useDispatch } from 'react-redux';

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
      {
        path: '/profile/orders',
        element: <OrdersPage />,
        loader: checkAuthLoader,
      },
      {
        path: '/orders-list',
        element: <OrdersListPage />,
        loader: checkAuthLoader,
      },
      {
        path: '/ingredients/:id',
        element: <IngredientPage />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
