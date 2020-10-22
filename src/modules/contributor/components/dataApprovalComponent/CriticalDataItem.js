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
    if (this.props.type === "Critical") {
      if (this.state.verbType !== "" && this.state.word !== "") {
        this.props.setCriticalData(this.props.index, this.state.verbType, this.state.word)
      }
    }
    else if (this.props.type === "Verb") {
      if (this.state.verbType !== "" && this.state.word !== "") {
        this.props.setVerb(this.props.index, this.state.verbType, this.state.word)
      }
    }
    
  }

  render() {
    const POSTags = ["Np", "Nc", "Nu", "N", "Ny", "Nb", "V", "Vb", "A", "P", "R", "L", "M", "E", "C", "Cc", "I", "T", "Y", "Z", "X", "CH"]
    return (
      <Row>
        <Col xs="auto">
          <Input type="select" name="verbType" onChange={this.handleInput}>
            <option selected disabled>None</option>
            {POSTags.map((value, index) => {
              return (<option key={index}>{value}</option>)
            })}
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
      </Row>
    );
  }
}

export default CriticalDataItem;
