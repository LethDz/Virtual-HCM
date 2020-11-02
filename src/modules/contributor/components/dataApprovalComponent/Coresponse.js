import React, { Component } from "react";
import {
  Col,
  Row,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Coresponse extends Component {
  constructor(props) {
    super();
    this.state = {
      coresponse: [],
    };
  }

  addCoresponse = () => {
    let type = document.getElementById("coresponse-type").value;
    let word = document.getElementById("coresponse-index").value;
    if (word.trim() !== "") {
      let temp = this.state.coresponse;
      temp.push({
        type: type,
        answer: word,
      });
      let sortedTemp = temp.sort((a, b) => (a.index > b.index ? 1 : -1));
      this.setState({
        coresponse: sortedTemp,
      });
    }
    this.setCoresponse();
  };

  removeCoresponse = (index) => {
    let coresponse = this.state.coresponse;
    if (index > -1) {
      coresponse.splice(index, 1);
    }
    this.setState({
      coresponse: coresponse,
    });
    this.setCoresponse();
  };

  setCoresponse = () => {
    this.props.setCoresponse(this.state.coresponse);
  };

  render() {
    const questionType = ["WHAT", "WHEN", "WHERE", "WHO", "WHY", "HOW"];
    return (
      <Col>
        <Label>Coresponse</Label>
        <Row>
          <Col xs="auto">
            <Input type="select" id="coresponse-type" placeholder="Type">
              {questionType.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </Input>
          </Col>
          <Col>
            <Input id="coresponse-index" />
          </Col>
          <Col xs="auto">
            <Button color="success" onClick={this.addCoresponse}>
              <FontAwesomeIcon icon={faPlus} /> Coresponse
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
