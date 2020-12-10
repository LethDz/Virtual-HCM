import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { Contributor } from 'src/modules/contributor/index';

const ContributorPage = () => (
  <LayoutWrapper>
    <ToastProvider placement="top-center" autoDismiss={true}>
      <Contributor />
    </ToastProvider>
  </LayoutWrapper>
);

export default ContributorPage;
