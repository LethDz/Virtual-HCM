import React from 'react';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { ContributorEdit } from 'src/modules/admin';

const ContributorEditPage = (props) => (
  <LayoutWrapper>
    <ContributorEdit id={props.match.params.id}/>
  </LayoutWrapper>
);

export default ContributorEditPage;
