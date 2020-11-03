import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

import { handleInputChange } from 'src/common/handleInputChange';

import { VERB, CRITICAL, POSTags } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class CriticalDataItem extends Component {
  constructor(props) {
    super();
    this.state = {
      verbType: '',
      word: '',
    };
  }

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  setVerb = () => {
    if (this.props.type === CRITICAL) {
      if (this.state.verbType !== '' && this.state.word !== '') {
        this.props.setCriticalData(
          this.props.index,
          this.state.verbType,
          this.state.word
        );
      }
    } else if (this.props.type === VERB) {
      if (this.state.verbType !== '' && this.state.word !== '') {
        this.props.setVerb(
          this.props.index,
          this.state.verbType,
          this.state.word
        );
      }
    }
  };

  render() {
    return (
      <Row>
        <Col xs="auto">
          <Input
            defaultValue={''}
            type="select"
            name="verbType"
            onChange={this.handleInput}
          >
            <option value="" disabled>
              None
            </option>
            {POSTags.map((value, index) => {
              return <option key={index}>{value}</option>;
            })}
          </Input>
        </Col>
        <Col xs="auto">
          <Input
            defaultValue={''}
            type="select"
            name="word"
            onChange={this.handleInput}
          >
            <option value="" disabled>
              None
            </option>
            {this.props.wordArray.map((data, index) => {
              return <option key={index}>{data.value}</option>;
            })}
          </Input>
        </Col>
        <Col xs="auto" className="p-0">
          <Button color="success" onClick={this.setVerb}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
      </Row>
    );
  }
}

export default CriticalDataItem;
