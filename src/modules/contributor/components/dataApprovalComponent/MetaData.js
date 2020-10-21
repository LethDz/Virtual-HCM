import React from "react";
import { Row, Col, Label, Input, Button } from "reactstrap";

const FormTitle = (props) => {
  return (
    <Row>
      <Col>
        <Col className="pl-0">
          <Label for="intent">Intent:</Label>
        </Col>
        <Col className="pl-0">
          <Label for="intentFullName">Intent full name:</Label>
        </Col>
      </Col>
      <Col className="m-1">
        <Input
          className="m-1"
          type="text"
          name="intent"
          id="intent"
          onChange={props.onChange}
        />
        <Input
          className="m-1"
          type="text"
          name="intentFullName"
          id="intentFullName"
          onChange={props.onChange}
        />
      </Col>
      <Col>
        <Col>
          <Col>
            <Label for="reference">Document reference: </Label>
          </Col>
          <Col>
            <Label for="page">Page:</Label>
          </Col>
        </Col>
      </Col>
      <Col>
        <Col className="m-1">
          <Input
            className="m-1"
            type="select"
            name="documentReference"
            id="reference"
            onChange={props.onChange}
          >
            <option>HCM tap 4</option>
            <option>HCM tap 5</option>
            <option>HCM tap 6</option>
          </Input>
        </Col>
        <Col className="m-1">
          <Input
            className="m-1"
            type="number"
            name="page"
            id="page"
            min="1"
            onChange={props.onChange}
          />
        </Col>
      </Col>
      <Col>
        <Button>Add new reference</Button>
      </Col>
    </Row>
  );
};

export default FormTitle;
