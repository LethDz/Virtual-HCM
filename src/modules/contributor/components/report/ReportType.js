import React from 'react';
import { Badge } from 'reactstrap';
import { reportType } from 'src/modules/contributor';

const ReportType = (props) => {
  return (
    <div className='d-flex m-auto h-100 align-items-sm-end justify-content-center'>
      <h6>
        <Badge
          color={`${
            reportType[props.value] === reportType[1] ? 'danger' : 'primary'
          }`}
        >
          {reportType[props.value]}
        </Badge>
      </h6>
    </div>
  );
};

export default ReportType;
