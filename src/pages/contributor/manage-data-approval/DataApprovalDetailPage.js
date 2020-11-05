import React from 'react';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { DataApprovalDetail } from 'src/modules/contributor/index';

const DataApprovalDetailPage = (props) => (
  <LayoutWrapper>
    <DataApprovalDetail intent={props.match.params.intent}/>
  </LayoutWrapper>
);

export default DataApprovalDetailPage;
