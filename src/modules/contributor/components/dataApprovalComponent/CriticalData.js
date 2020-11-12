import React, { Component } from 'react';
import {
  Col,
  Label,
  Row,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
} from 'reactstrap';
import {
  CriticalDataItem,
  criticalType,
  CRITICAL,
  VERB,
} from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { handleInputChange } from 'src/common/handleInputChange';

class CriticalData extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      criticalData: [],
      type: criticalType[0],
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    if (this.props.criticalDataValue && this.props.criticalDataValue.length) {
      let result = [];
      this.props.criticalDataValue.forEach((critical, index) => {
        result.push({ ...critical, index });
      });
      this.setState({ criticalData: result });
    }
  };

  componentWillUnmount = () => {
    this._isMounted = false;
  };

  handleInput = (event) => handleInputChange(event, this);

  addCriticalData = () => {
    let type = this.state.type;
    let temp = this.state.criticalData;
    temp.push({
      type: type,
      word: [],
      verb: [],
      index: temp.length,
    });
    let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
    if (this._isMounted) this.setState({ criticalData: sortedTemp });
    this.setCritical();
  };

  setCriticalData = (index, type, word) => {
    let critical = {
      type: type,
      word: word,
    };
    let criticalData = this.state.criticalData;
    criticalData[index].word.push(critical);
    if (this._isMounted) this.setState({ criticalData: criticalData });
    this.setCritical();
  };

  removeCritical = (index) => {
    let criticalData = this.state.criticalData;
    if (index > -1) {
      criticalData.splice(index, 1);
    }
    if (this._isMounted)
      this.setState({
        criticalData: criticalData,
      });
    this.setCritical();
  };

  setVerb = (index, type, word) => {
    let verb = {
      type: type,
      word: word,
    };
    let criticalData = this.state.criticalData;
    criticalData[index].verb.push(verb);
    if (this._isMounted) this.setState({ criticalData: criticalData });
    this.setCritical();
  };

  removeComponent = (type, criticalIndex, index) => {
    let criticalData = this.state.criticalData;
    if (index > -1) {
      if (type === VERB) {
        criticalData[criticalIndex].verb.splice(index, 1);
      } else if (type === CRITICAL) {
        criticalData[criticalIndex].word.splice(index, 1);
      }
    }
    let listCritical = criticalData[criticalIndex];
    let list = [];
    for (let i in listCritical) {
      if (listCritical[i] !== null && listCritical[i] !== '')
        list.push(listCritical[i]);
    }
    if (this._isMounted)
      this.setState({
        criticalData: criticalData,
      });
    this.setCritical();
  };

  setCritical = () => {
    this.props.setCritical(this.reformatCritical());
  };

  reformatCritical = () => {
    let critical = this.state.criticalData;
    let criticalTemp = [];
    critical.forEach((critical) => {
      criticalTemp.push({
        type: critical.type,
        word: critical.word,
        verb: critical.verb,
      });
    });
    return criticalTemp;
  };

  render() {
    return (
      <Row>
        <Col>
          <Label className="label">Subject:</Label>
          <Row>
            <Col xs="auto">
              <Input
                type="select"
                name="type"
                value={this.state.type}
                onChange={this.handleInput}
              >
                {criticalType.map((value, index) => {
                  return <option key={index}>{value}</option>;
                })}
              </Input>
            </Col>

            <Col xs="auto">
              <Button color="primary" onClick={this.addCriticalData}>
                <FontAwesomeIcon icon={faPlusCircle} /> Subject
              </Button>
            </Col>
          </Row>
          <ListGroup className="mt-1">
            {this.state.criticalData.map((criticalData, index) => {
              return (
                <ListGroupItem className="bound-group" key={index}>
                  <Row>
                    <Col>
                      <Row>
                        <span className="ml-2">
                          Subject type: {criticalData.type}
                        </span>
                      </Row>
                    </Col>
                    <Col xs="auto">
                      <Button
                        color="danger"
                        onClick={() => {
                          this.removeCritical(index);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="border-right-solid">
                      <Label>Subject component: </Label>
                      <CriticalDataItem
                        type={CRITICAL}
                        index={index}
                        wordArray={this.props.wordArray}
                        setCriticalData={this.setCriticalData}
                      />
                      <ListGroup>
                        {this.state.criticalData[index].word.map(
                          (word, index) => {
                            return (
                              <ListGroupItem className="mt-1" key={index}>
                                <Row>
                                  <Col>
                                    {word.type}: {word.word}
                                  </Col>
                                  <Col xs="auto">
                                    <Button
                                      color="danger"
                                      onClick={() => {
                                        this.removeComponent(
                                          CRITICAL,
                                          criticalData.index,
                                          index
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                  </Col>
                                </Row>
                              </ListGroupItem>
                            );
                          }
                        )}
                      </ListGroup>
                    </Col>
                    <Col>
                      <Label>Verb: </Label>
                      <CriticalDataItem
                        type={VERB}
                        index={index}
                        wordArray={this.props.wordArray}
                        setVerb={this.setVerb}
                      />
                      <ListGroup>
                        {this.state.criticalData[index].verb.map(
                          (verb, index) => {
                            return (
                              <ListGroupItem className="mt-1" key={index}>
                                <Row>
                                  <Col>
                                    {verb.type}: {verb.word}
                                  </Col>
                                  <Col xs="auto">
                                    <Button
                                      color="danger"
                                      onClick={() => {
                                        this.removeComponent(
                                          VERB,
                                          criticalData.index,
                                          index
                                        );
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrashAlt} />
                                    </Button>
                                  </Col>
                                </Row>
                              </ListGroupItem>
                            );
                          }
                        )}
                      </ListGroup>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default CriticalData;
