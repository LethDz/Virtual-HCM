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
      wordArray: [],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.setData();
  };

  setData = () => {
    const criticalValue = this.props.criticalValue;
    const wordArray = [...this.props.wordArray];
    let result = []
    wordArray.forEach(word => {
      let isContain = false
      criticalValue.forEach(item => {
        if (item.word === word.value) {
          isContain = true
        }
      })
      if (!isContain) {
        result.push(word)
      }
    })

    this.setState({ wordArray: result });
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInput = (event) => {
    handleInputChange(event, this);
    this.state.wordArray.forEach((word) => {
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
    this.removeWord(this.state.word, this.state.verbType);
  };

  removeWord = (word, verbType) => {
    let wordArray = [];
    this.state.wordArray.forEach((item) => {
      if (!(item.value === word && item.type === verbType)) {
        wordArray.push(item);
      }
    });
    this._isMounted &&
      this.setState({ wordArray: wordArray, word: '', verbType: '' });
  };

  addWordToArray = (word) => {
    let wordArray = this.state.wordArray;
    wordArray.push({ type: word.type, value: word.word });
    this._isMounted && this.setState({ wordArray: wordArray });
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
              value={this.state.word}
              type="select"
              name="word"
              onChange={this.handleInput}
            >
              <option value="" disabled>
                None
              </option>
              {this.state.wordArray.map((data, index) => {
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
