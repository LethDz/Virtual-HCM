import React from 'react';
import LayoutWrapper from 'src/layouts/LayoutWrapper';
import { UserDetail } from 'src/modules/user';

const UserDetailPage = (props) => (
  <LayoutWrapper>
    <UserDetail id={props.match.params.id} />
  </LayoutWrapper>
);

export default UserDetailPage;
