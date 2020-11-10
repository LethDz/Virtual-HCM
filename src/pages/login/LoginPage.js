import React from 'react';
import { Login } from 'src/modules/login/index';
import { ToastProvider } from 'react-toast-notifications';

const LoginPage = () => (
  <ToastProvider placement="top-center" autoDismiss={false}>
    <Login />
  </ToastProvider>
);

export default LoginPage;
