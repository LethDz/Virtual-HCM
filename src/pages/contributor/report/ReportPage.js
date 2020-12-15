import React from 'react';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { Report } from 'src/modules/contributor';
import { ToastProvider } from 'react-toast-notifications';

const ReportPage = () => (
  <LayoutWrapper>
    <ToastProvider placement='top-center' autoDismiss={true}>
      <Report />
    </ToastProvider>
  </LayoutWrapper>
);

export default ReportPage;
