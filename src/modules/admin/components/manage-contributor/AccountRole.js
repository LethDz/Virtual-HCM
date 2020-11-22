import React from 'react';
import { Badge } from 'reactstrap';

const AccountRole = (props) => {
  return (
    <div className="d-flex m-auto h-100 align-items-sm-end justify-content-center">
      <h6>
        <Badge color={`${props.value ? 'primary' : 'success'}`}>
          {props.value ? 'Admin' : 'Contributor'}
        </Badge>
      </h6>
    </div>
  );
};

export default AccountRole;
