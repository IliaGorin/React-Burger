import React, { useEffect, FC } from 'react';

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
import { OrdersHistoryPage } from '../../pages/orders-history/orders-history';
import { OrdersListPage } from '../../pages/orders-list/orders-list';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { getIngredients } from '../../services/actions/get-ingredients-actions';
// import { useDispatch } from 'react-redux';
import { useDispatch } from '../../utils/Types';
import { getUserInfo } from '../../services/actions/users';
import { OrderPage } from '../../pages/order-page/order-page';

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
        element: <OrdersHistoryPage />,
        loader: checkAuthLoader,
      },
      {
        path: '/profile/orders/:id',
        element: <OrderPage />,
        loader: checkAuthLoader,
      },
      {
        path: '/feed',
        element: <OrdersListPage />,
      },
      {
        path: '/feed/:id',
        element: <OrderPage />,
        loader: () => {
          console.log('route to /feed/:id');
          return null;
        },
      },
      {
        path: '/ingredients/:id',
        element: <IngredientPage />,
      },
    ],
  },
]);

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
