import React, { Component } from "react";
import { Col, Row, Label, Input, ListGroup, ListGroupItem, Button} from "reactstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class Coresponse extends Component {
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
            <Button color="success" onClick={this.props.addCoresponse}><FontAwesomeIcon icon={faPlus} /> Coresponse</Button>
          </Col>
        </Row>
        <ListGroup className="mt-1">
          {this.props.coresponse.map((coresponse, index) => {
            return (
              <ListGroupItem key={index}>
                <Row>
                  <Col>
                    {coresponse.type}: {coresponse.word}
                  </Col>
                  <Col xs="auto">
                    <Button color="danger"
                      onClick={() => {
                        this.props.removeCoresponse(index);
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
