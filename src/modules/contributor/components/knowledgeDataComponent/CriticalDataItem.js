import React, { Component } from 'react';
import {
  Row,
  Col,
  Input,
  Button,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

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
    this._isMounted = true;
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInput = (event) => {
    handleInputChange(event, this);
    this.props.wordArray.forEach((word) => {
      if (word.value === event.target.value) {
        this._isMounted && this.setState({ verbType: word.type });
      }
    });
    this.props.type === CRITICAL &&
      this.props.checkSubjectType &&
      this.props.checkSubjectType(event.target.value, this.props.index);
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
          <h2>{this.state.verbType}</h2>
        </Col>
        <Col xs="auto">
          <InputGroup>
            <Input
              disabled={this.props.disable}
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
            <InputGroupAddon addonType="append">
              <Button
                disabled={this.props.disable}
                color="success"
                onClick={this.setVerb}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}

export default CriticalDataItem;
