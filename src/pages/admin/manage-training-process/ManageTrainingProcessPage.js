import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { ManageTrainingProcess } from 'src/modules/admin';

const ManageTrainingProcessPage = () => (
  <LayoutWrapper>
    <ToastProvider placement="top-center" autoDismiss={true}>
      <ManageTrainingProcess />
    </ToastProvider>
  </LayoutWrapper>
);

export default ManageTrainingProcessPage;
