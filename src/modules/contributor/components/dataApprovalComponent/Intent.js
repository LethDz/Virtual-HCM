import React, { useRef } from "react";
import { FormGroup, Label, Input, Col } from "reactstrap";

const Intent = (props) => {
  const intentRef = useRef("");
  const intentFullNameRef = useRef("");
  return (
    <div className="row">
      <div className="col">
        <FormGroup row>
          <Label for="intent">
            Intent:
          </Label>
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
        </FormGroup>
      </div>
      <div className="col">
        <FormGroup row>
          <Label for="intentFullName">
            Intent full name:
          </Label>
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
        </FormGroup>
      </div>
    </div>
  );
};

export default Intent;
