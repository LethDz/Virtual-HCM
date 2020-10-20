import React from "react";
import { Row, Col } from "reactstrap";

const FormSectionTitle = (props) => {
  return (
    <Row xs="1">
      <Col>
        <h3 className="text-center m-3">{props.title}</h3>
        <hr className="section-line"/>
      </Col>
    </Row>
  );
};

export default FormSectionTitle;
