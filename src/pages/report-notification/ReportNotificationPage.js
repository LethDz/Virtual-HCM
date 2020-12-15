import React from 'react';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { ReportNotification } from 'src/modules/report-notification';

const ReportNotificationPage = (props) => {
  const query = new URLSearchParams(props.location?.search);
  return (
    <LayoutWrapper>
      <ReportNotification list={query.get('list')} />
    </LayoutWrapper>
  );
};

export default ReportNotificationPage;
