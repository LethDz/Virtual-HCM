import React, { Component } from 'react';
import {
  Col,
  Row,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
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
    let type = this.state.currentCoresponseType;
    let word = this.state.currentCoresponse;
    if (word.trim() !== '') {
      let temp = this.state.coresponse;
      temp.push({
        type: type,
        answer: word,
      });
      let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
      if (this._isMounted) {
        this.setState({
          coresponse: sortedTemp,
        });
      }
    }
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
      <Col>
        <Label>Coresponse</Label>
        <Row>
          <Col xs="auto">
            <Input
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
            <Input onChange={this.handleInput} name="currentCoresponse" />
          </Col>
          <Col xs="auto">
            <Button color="primary" onClick={this.addCoresponse}>
              <FontAwesomeIcon icon={faPlusCircle} /> Coresponse
            </Button>
          </Col>
        </Row>
        <ListGroup className="mt-1">
          {this.state.coresponse.map((coresponse, index) => {
            return (
              <ListGroupItem key={index}>
                <Row>
                  <Col>
                    {coresponse.type}: {coresponse.answer}
                  </Col>
                  <Col xs="auto">
                    <Button
                      color="danger"
                      onClick={() => {
                        this.removeCoresponse(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </Col>
    );
  }
}

export default Coresponse;
