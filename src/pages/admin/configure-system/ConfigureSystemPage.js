import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { ConfigureSystemHook } from 'src/modules/admin';

const ConfigureSystemPage = () => {
  return (
    <LayoutWrapper>
      <ToastProvider placement="top-center" autoDismiss={true}>
        <ConfigureSystemHook />
      </ToastProvider>
    </LayoutWrapper>
  );
};

export default ConfigureSystemPage;
