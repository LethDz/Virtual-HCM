import React from 'react';
import { Row, Col } from 'reactstrap';

const FormSectionTitle = (props) => {
  return (
    <Row xs="1">
      <Col>
        <h5 className="mt-3 mb-3 form-item-title text-primary">
          {props.title}
        </h5>
      </Col>
    </Row>
  );
};

export default FormSectionTitle;
