import React, { Component } from "react";
import { Row, Col, Label, Button, Input } from "reactstrap";

class RawData extends Component {
  constructor(props) {
    super();
    this.state = {
      mode: "NORMAL",
    };
  }

  stateTokenizeRawDate = () => {
    this.setState({ mode: "TOKENIZE" });
  };

  stateCancelTokenize = () => {
    this.setState({ mode: "NORMAL" });
  };

  renderRawDataMode = () => {
    if (this.state.mode === "TOKENIZE") {
      return (
        <Row>
          <Col>
            {this.props.getWordArray().map((data, index) => {
              return (
                <span className="mr-1" key={index}>
                  {data.value}
                </span>
              );
            })}
          </Col>
          <Col xs="1" className="p-0">
            <Button
              type="button"
              color="danger"
              onClick={this.stateCancelTokenize}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Row>
          <Col>
            <Input
              required
              type="textarea"
              name="rawData"
              id="rawData"
              onChange={this.props.onChange}
            />
          </Col>
          <Col xs="1" className="p-0">
            <Button
              type="button"
              color="primary"
              onClick={this.stateTokenizeRawDate}
            >
              Tokenize
            </Button>
          </Col>
        </Row>
      );
    }
  };
  render() {
    return (
      <Row className="p-3" xs="1">
        <Col>
          <Label for="rawData">Raw data:</Label>
          {this.renderRawDataMode()}
        </Col>
      </Row>
    );
  }
}

export default RawData;
