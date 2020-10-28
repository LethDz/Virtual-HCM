import React, { Component } from "react";
import { Row, Col, Label, Input, Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


class MetaData extends Component {
  newRefer = (e) => {
    console.log("test")
  }

  render() {
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
            required
            className="m-1"
            type="text"
            name="intent"
            id="intent"
            onChange={this.props.onChange}
          />
          <Input
            required
            className="m-1"
            type="text"
            name="intentFullName"
            id="intentFullName"
            onChange={this.props.onChange}
          />
        </Col>
        <Col className="pr-0" xs="auto">
          <Col>
            <Label className="label" for="reference">
              Document reference:
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
              required
              className="m-1"
              type="select"
              name="documentReference"
              id="reference"
              defaultValue={""}
              onChange={this.props.onChange}
            >
              <option value={""} disabled>
                None
              </option>
              {references.map((reference, index) => {
                return <option key={index}>{reference}</option>;
              })}
            </Input>
          </Col>
          <Col className="m-1">
            <Input
              required
              className="m-1"
              type="number"
              name="page"
              id="page"
              min="1"
              onChange={this.props.onChange}
            />
          </Col>
        </Col>
        <Col className="m-1 pl-0 ml-0">
          <Button type="button" onClick={this.newRefer} color="success">
            <FontAwesomeIcon icon={faPlus} /> New reference
          </Button>
        </Col>
      </Row>
    );
  }
}

export default MetaData;
