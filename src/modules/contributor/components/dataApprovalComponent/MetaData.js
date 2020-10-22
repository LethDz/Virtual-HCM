import React from "react";
import { Row, Col, Label, Input, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MetaData = (props) => {
  const references = ["HCM tap 4", "HCM tap 5", "HCM tap 6"];
  return (
    <Row className="pb-3">
      <Col className="pr-0" xs="auto">
        <Col>
          <Label className="label" for="intent">
            Intent:
          </Label>
        </Col>
        <Col>
          <Label className="label" for="intentFullName">
            Intent full name:
          </Label>
        </Col>
      </Col>
      <Col className="m-1 pl-0 ml-0">
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
      <Col className="pr-0" xs="auto">
        <Col>
          <Label className="label" for="reference">
            Document reference:{" "}
          </Label>
        </Col>
        <Col>
          <Label className="label" for="page">
            Page:
          </Label>
        </Col>
      </Col>
      <Col className="m-1 pl-0 ml-0">
        <Col className="m-1">
          <Input
            className="m-1"
            type="select"
            name="documentReference"
            id="reference"
            onChange={props.onChange}
          >
            {references.map((reference, index) => {
              return <option key={index}>{reference}</option>;
            })}
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
      <Col className="m-1 pl-0 ml-0">
        <Button color="success">
          <FontAwesomeIcon icon={faPlus} /> New reference
        </Button>
      </Col>
    </Row>
  );
};

export default MetaData;
