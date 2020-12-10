import React from 'react';
import { Badge } from 'reactstrap';

const ReportedIntent = (props) => {
  return (
    <div className='d-flex m-auto h-100 align-items-sm-end justify-content-center'>
      <h6>
        <Badge color='success'>{props.value}</Badge>
      </h6>
    </div>
  );
};

export default ReportedIntent;
