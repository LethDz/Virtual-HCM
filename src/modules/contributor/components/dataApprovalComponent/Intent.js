import React, { useRef } from "react";
import { Input, Col, Row } from "reactstrap";

const Intent = (props) => {
  const intentRef = useRef("");
  const intentFullNameRef = useRef("");
  return (
    <Row>
      <Col xs="6" sm="4">
        <Row>
          <Col xs="auto">Intent:</Col>
          <Col>
            <Input
              innerRef={intentRef}
              type="text"
              name="intent"
              id="intent"
              onChange={() => {
                props.setIntent(
                  intentRef.current.value,
                  intentFullNameRef.current.value
                );
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col xs="6" sm="4">
        <Row>
          <Col xs="auto">Intent full name:</Col>
          <Col>
            <Input
              innerRef={intentFullNameRef}
              type="text"
              name="intentFullName"
              id="intentFullName"
              onChange={() => {
                props.setIntent(
                  intentRef.current.value,
                  intentFullNameRef.current.value
                );
              }}
            />
          </Col>
        </Row>
      </Col>
      <Col sm="4"></Col>
    </Row>
  );
};

export default Intent;
