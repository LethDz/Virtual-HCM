import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { Admin } from 'src/modules/admin/index';

const AdminPage = () => (
  <LayoutWrapper>
    <ToastProvider placement="top-center" autoDismiss={true}>
      <Admin />
    </ToastProvider>
  </LayoutWrapper>
);

export default AdminPage;
