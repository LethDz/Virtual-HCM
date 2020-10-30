import React, { Component } from "react";
import { Row, Col, Label, Button, Input } from "reactstrap";

import axiosClient from "src/common/axiosClient";
import { NLP, TOKENIZE } from "src/constants";
import { handleInputChange } from "src/common/handleInputChange";

import LoadingSpinner from "src/common/loadingSpinner/LoadingSpinner";

class RawData extends Component {
  constructor(props) {
    super();
    this.state = {
      mode: "NORMAL",
      tokenizeData: [],
      ner: [],
      loading: false,
      rawData: ""
    };
  }
  handleInput = (event) => {
    handleInputChange(event, this);
    this.props.onChange(event, this)
  }

  stateTokenizeRawDate = () => {
    this.setState({ loading: true });
    const paragraph = {
      paragraph: this.state.rawData,
    };
    axiosClient
      .post(NLP + TOKENIZE, paragraph)
      .then((response) => {
        console.log(response)
        let fullArray = [];
        response.data.result_data.pos.forEach((array) => {
          fullArray.push(...array);
        });
        let modifiedNer = [];
        let ner = response.data.result_data.ner;
        for (let sentenceIndex in ner) {
          for (let idx in ner[sentenceIndex]) {
            let type = ner[sentenceIndex][idx].type;
            let word = ner[sentenceIndex][idx].word;
            let index = ner[sentenceIndex][idx].start_idx;
            if (sentenceIndex === 0) {
              modifiedNer.push({
                type: type,
                word: word,
                index: index,
              });
            } else {
              let index = ner[sentenceIndex][idx].start_idx;
              for (let i = 0; i < sentenceIndex; i++) {
                index += response.data.result_data.pos[i].length;
              }
              modifiedNer.push({
                type: type,
                word: word,
                index: index,
              });
            }
          }
        }

        this.setState({
          mode: "TOKENIZE",
          tokenizeData: fullArray,
          ner: modifiedNer,
          loading: false,
        });
        this.setTokenizedWordArray();
      })
      .catch((err) => this.setState({ loading: false }));
  };

  setRawData = () => {
    this.props.setRawData(this.state.rawData)
  }

  setTokenizedWordArray = () => {
    this.props.setTokenizeWord(this.state.tokenizeData, this.state.ner);
  };

  stateCancelTokenize = () => {
    this.setState({ mode: "NORMAL" });
  };

  renderRawDataMode = () => {
    if (this.state.mode === "TOKENIZE") {
      return (
        <Row>
          <Col xs="auto">
            <div className="d-flex flex-wrap">
              {this.state.tokenizeData.map((data, index) => {
                let flag = false;
                this.state.ner.forEach((ner) => {
                  if (ner.index === index) flag = true;
                });
                if (data.type === "V") {
                  return (
                    <span className="mr-1 verb word-box" key={index}>
                      {data.value}
                    </span>
                  );
                } else if (data.type === "N") {
                  return (
                    <span className="mr-1 noun word-box" key={index}>
                      {data.value}
                    </span>
                  );
                } else if (flag) {
                  return (
                    <span className="mr-1 name word-box" key={index}>
                      {data.value}
                    </span>
                  );
                } else {
                  return (
                    <span className="mr-1 word-box" key={index}>
                      {data.value}
                    </span>
                  );
                }
              })}
            </div>
          </Col>
          <Col xs="auto">
            <Button
              type="button"
              color="danger"
              className="mt-2"
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
              value={this.state.rawData}
              onChange={this.handleInput}
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
        <Col>
          <LoadingSpinner loading={this.state.loading} text="Tokenizing">
            {this.renderRawDataMode()}
          </LoadingSpinner>
        </Col>
      </Row>
    );
  }
}

export default RawData;
