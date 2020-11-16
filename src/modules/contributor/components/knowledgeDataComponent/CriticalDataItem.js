import React, { Component } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

import { handleInputChange } from 'src/common/handleInputChange';

import { VERB, CRITICAL } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class CriticalDataItem extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      verbType: '',
      word: '',
    };
  }

  componentDidMount = () => {
    this._isMounted = true
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  handleInput = (event) => {
    this._isMounted && this.setState({ verbType: event.target.value })
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
          <h1>{this.state.verbType}</h1>
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
              return <option key={index} value={data.type}>{data.value}</option>;
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
