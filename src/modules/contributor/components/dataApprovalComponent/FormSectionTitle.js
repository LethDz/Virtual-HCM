import React from 'react';
import { Row, Col } from 'reactstrap';

const FormSectionTitle = (props) => {
  return (
    <Row xs="1">
      <Col>
        <h5 className="m-3 form-item-title text-primary">{props.title}</h5>
      </Col>
    </Row>
  );
};

export default FormSectionTitle;
