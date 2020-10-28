import React, { Component } from "react";
import { Row, Col, Label, Button, Input } from "reactstrap";

import axiosClient from "src/common/axiosClient";
import { KNOWLEDGE_DATA, EXTRACT_SENTENCE } from "src/constants";
import { handleInputChange } from "src/common/handleInputChange";

class RawData extends Component {
  constructor(props) {
    super();
    this.state = {
      mode: "NORMAL",
      tokenizeData: [],
    };
  }
  handleInput = (event) => handleInputChange(event, this);

  stateTokenizeRawDate = () => {
    const paragraph = {
      paragraph: this.props.rawData,
    };
    axiosClient
      .post(KNOWLEDGE_DATA + EXTRACT_SENTENCE, paragraph)
      .then((response) => {
        console.log(response.data.result_data);
        this.setState({
          mode: "TOKENIZE",
          tokenizeData: response.data.result_data.pos,
        });
        this.setTokenizedWordArray();
      })
      .catch((err) => console.log(err));
  };

  setTokenizedWordArray = () => {
    this.props.setTokenizeWord(this.state.tokenizeData);
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
          <Col xs="auto">
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
          <Col xs="auto">
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
        </Col>
        <Col>{this.renderRawDataMode()}</Col>
      </Row>
    );
  }
}

export default RawData;
