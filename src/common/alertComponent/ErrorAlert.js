import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Row } from 'reactstrap';

const ErrorAlert = (props) => {
  const onDismiss = () => {
    props.onDismiss();
  };
  return (
    <Row>
      <Alert
        color="danger"
        isOpen={props.errorAlert}
        toggle={props.onDismiss ? onDismiss : false}
        className="m-3 w-100"
      >
        <p>
          <FontAwesomeIcon icon={faFrown} />
          &nbsp; Error has been occurred. Please try again !
        </p>
        {props.errorList.length !== 0
          ? props.errorList.map((element, index) => (
              <li key={index + ' error'}>{element}</li>
            ))
          : ''}
      </Alert>
    </Row>
  );
};

export default ErrorAlert;
