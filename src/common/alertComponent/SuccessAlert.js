import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Row } from 'reactstrap';

const SuccessAlert = (props) => {
  const onDismiss = () => {
    props.onDismiss();
  };
  return (
    <Row>
      <Alert
        color="success"
        isOpen={props.successAlert}
        toggle={props.onDismiss ? onDismiss : false}
        className="m-3 w-100"
      >
        <FontAwesomeIcon icon={faSmile} />
        &nbsp; {props.text}
      </Alert>
    </Row>
  );
};

export default SuccessAlert;
