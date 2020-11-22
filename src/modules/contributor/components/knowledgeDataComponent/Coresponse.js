import React, { Component } from 'react';
import {
  Col,
  Row,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
  Badge,
} from 'reactstrap';
import { questionType } from 'src/modules/contributor/index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { handleInputChange } from 'src/common/handleInputChange';

class Coresponse extends Component {
  _isMounted = false;
  constructor(props) {
    super();
    this.state = {
      coresponse: [],
      currentCoresponse: '',
      currentCoresponseType: questionType[0],
    };
  }

  handleInput = (event) => handleInputChange(event, this);

  componentDidMount() {
    this._isMounted = true;
    if (this.props.coresponseValue && this.props.coresponseValue.length) {
      this.setState({ coresponse: this.props.coresponseValue });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  addCoresponse = () => {
    let coresponse = this.state.coresponse;
    let type = this.state.currentCoresponseType;
    let word = this.state.currentCoresponse;
    if (word.trim() !== '') {
      coresponse.push({
        type: type,
        answer: word,
      });
    }
    this._isMounted &&
      this.setState({
        coresponse: coresponse,
        currentCoresponse: '',
      });

    this.setCoresponse();
  };

  removeCoresponse = (index) => {
    let coresponse = this.state.coresponse;
    if (index > -1) {
      coresponse.splice(index, 1);
    }
    if (this._isMounted) {
      this.setState({
        coresponse: coresponse,
      });
    }
    this.setCoresponse();
  };

  setCoresponse = () => {
    this.props.setCoresponse(this.state.coresponse);
  };

  render() {
    return (
      <Row>
        <Col>
          <Label className="label">Coresponse answer:</Label>
          {!this.props.disable &&
            <Row>
              <Col xs="auto">
                <Input
                  disabled={this.props.disable}
                  onChange={this.handleInput}
                  name="currentCoresponseType"
                  ref={this.coresponseRef}
                  type="select"
                >
                  {questionType.map((value, index) => {
                    return <option key={index}>{value}</option>;
                  })}
                </Input>
              </Col>
              <Col>
                <Input
                  disabled={this.props.disable}
                  placeholder="Enter coresponse here then press the add button on the right side"
                  onChange={this.handleInput}
                  name="currentCoresponse"
                  value={this.state.currentCoresponse}
                />
              </Col>
              <Col xs="auto">
                <Button
                  disabled={this.props.disable}
                  color="primary"
                  onClick={this.addCoresponse}
                >
                  <FontAwesomeIcon icon={faPlusCircle} /> Coresponse
            </Button>
              </Col>
            </Row>
          }
          <ListGroup className="mt-1">
            {this.state.coresponse.map((coresponse, index) => {
              let type;
              switch (coresponse.type.toUpperCase()) {
                case questionType[0]:
                  type = <Badge color="primary">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                case questionType[1]:
                  type = <Badge color="secondary">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                case questionType[2]:
                  type = <Badge color="success">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                case questionType[3]:
                  type = <Badge color="danger">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                case questionType[4]:
                  type = <Badge color="warning">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                case questionType[5]:
                  type = <Badge color="info">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                case questionType[6]:
                  type = <Badge color="dark">{coresponse.type.toUpperCase()}</Badge>;
                  break;
                default:
              }
              return (
                <ListGroupItem key={index}>
                  <Row>
                    <Col>
                      {coresponse.answer}
                    </Col>
                    <Col xs='auto'>{type}</Col>
                    {!this.props.disable &&
                      <Col xs="auto">
                        <Button
                          disabled={this.props.disable}
                          color="danger"
                          onClick={() => {
                            this.removeCoresponse(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </Col>
                    }

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

export default Coresponse;
