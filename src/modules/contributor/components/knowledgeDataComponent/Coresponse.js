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
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { coresponseType } from 'src/modules/contributor/index';

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
      currentCoresponseType: coresponseType[0],
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
          {!this.props.disable && (
            <Row>
              <Col>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <Input
                      disabled={this.props.disable}
                      onChange={this.handleInput}
                      name="currentCoresponseType"
                      ref={this.coresponseRef}
                      type="select"
                    >
                      {coresponseType.map((value, index) => {
                        return <option key={index}>{value}</option>;
                      })}
                    </Input>
                  </InputGroupAddon>
                  <Input
                    disabled={this.props.disable}
                    placeholder="Enter coresponse here then press the add button on the right side"
                    onChange={this.handleInput}
                    name="currentCoresponse"
                    value={this.state.currentCoresponse}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      disabled={this.props.disable}
                      color="primary"
                      onClick={this.addCoresponse}
                    >
                      <FontAwesomeIcon icon={faPlusCircle} /> Coresponse
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          )}
          <ListGroup className="mt-1">
            {this.state.coresponse.map((coresponse, index) => {
              let type;
              switch (coresponse.type.toUpperCase()) {
                case coresponseType[0]:
                  type = (
                    <h6>
                      <Badge color="primary">
                        {coresponse.type.toUpperCase()}
                      </Badge>
                    </h6>
                  );
                  break;
                case coresponseType[1]:
                  type = (
                    <h6>
                      <Badge color="secondary">
                        {coresponse.type.toUpperCase()}
                      </Badge>
                    </h6>
                  );
                  break;
                case coresponseType[2]:
                  type = (
                    <h6>
                      <Badge color="success">
                        {coresponse.type.toUpperCase()}
                      </Badge>
                    </h6>
                  );
                  break;
                case coresponseType[3]:
                  type = (
                    <h6>
                      <Badge color="danger">
                        {coresponse.type.toUpperCase()}
                      </Badge>
                    </h6>
                  );
                  break;
                case coresponseType[4]:
                  type = (
                    <h6>
                      <Badge color="warning">
                        {coresponse.type.toUpperCase()}
                      </Badge>
                    </h6>
                  );
                  break;
                case coresponseType[5]:
                  type = (
                    <h6>
                      <Badge color="info">
                        {coresponse.type.toUpperCase()}
                      </Badge>
                    </h6>
                  );
                  break;
                default:
              }
              return (
                <ListGroupItem key={index}>
                  <Row>
                    <Col>{coresponse.answer}</Col>
                    <Col xs="auto">{type}</Col>
                    {!this.props.disable && (
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
                    )}
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
