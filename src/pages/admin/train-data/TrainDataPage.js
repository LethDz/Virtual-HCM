import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { TrainData } from 'src/modules/admin';

const TrainDataPage = () => (
  <LayoutWrapper>
    <ToastProvider placement="top-center" autoDismiss={true}>
      <TrainData />
    </ToastProvider>
  </LayoutWrapper>
);

export default TrainDataPage;
