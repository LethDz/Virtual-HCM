import React from "react";
import { Row, Col, Button, Label, Input } from "reactstrap";

const Reference = (props) => {
  return (
    <Row className="mt-3" xs="1">
      <Col xs="6">
        <Row>
          <Col xs="auto">
            <Label for="reference">Document reference: </Label>
          </Col>
          <Col>
            <Input
              className="m-1"
              innerRef={props.documentInnerRef}
              type="select"
              name="reference"
              id="reference"
              onChange={() => {
                props.setDocument(props.documentValue.current.value);
              }}
            >
              <option>HCM tap 4</option>
              <option>HCM tap 5</option>
              <option>HCM tap 6</option>
            </Input>
          </Col>
        </Row>
      </Col>
      <Col xs="6">
        <Row>
          <Col xs="auto">
            <Label for="page">Page:</Label>
          </Col>
          <Col xs="auto">
            <Input
              className="m-1"
              innerRef={props.pageInnerRef}
              type="number"
              name="Page"
              id="Page"
              min="1"
              onChange={() => {
                props.setPage(props.pageValue.current.value);
              }}
            />
          </Col>
          <Col>
            <Button>Add new reference</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Reference;
