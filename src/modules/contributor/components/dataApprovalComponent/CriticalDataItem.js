import React, { Component } from "react";
import { Row, Col, Input, Button } from "reactstrap";

import { handleInputChange } from "src/common/handleInputChange";

class CriticalDataItem extends Component {
  constructor(props) {
    super();
    this.state = {
      verbType: "",
      word: "",
    };

  }

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  setVerb = () => {
    if (this.state.verbType !== "" && this.state.word !== "") {
      this.props.setVerb(this.props.index, this.state.verbType, this.state.word)
    }
  }

  removeCritical = () => {
    this.props.removeCritical(this.props.index)
  }

  render() {
    return (
      <Row>
        <Col xs="auto">
          <Input type="select" name="verbType" onChange={this.handleInput}>
            <option selected disabled>None</option>
            <option>V</option>
            <option>Nc</option>
          </Input>
        </Col>
        <Col xs="auto">
          <Input type="select" name="word" onChange={this.handleInput}>
            <option selected disabled>None</option>
            {this.props.wordArray.map((data, index) => {
              return <option key={index}>{data.value}</option>;
            })}
          </Input>
        </Col>
        <Col xs="auto" className="p-0">
          <Button
            onClick={this.setVerb}
          >
            Add
          </Button>
        </Col>
        <Col xs="auto">
          <Button onClick={this.removeCritical}>Remove</Button>
        </Col>
      </Row>
    );
  }
}

export default CriticalDataItem;
