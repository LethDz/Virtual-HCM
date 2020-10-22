import React, { Component } from "react";
import { Col, Row, Label, Input, ListGroup, ListGroupItem, Button} from "reactstrap"

class Coresponse extends Component {
  render() {
    const questionType = ["WHAT", "WHEN", "WHERE", "WHO", "WHY", "HOW"];
    return (
      <Col>
        <Label>Coresponse</Label>
        <Row>
          <Col xs="4">
            <Input type="select" id="coresponse-type" placeholder="Type">
              {questionType.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </Input>
          </Col>
          <Col>
            <Input type="select" id="coresponse-index">
              {this.props.wordArray.map((data, index) => {
                return <option key={index}>{data.value}</option>;
              })}
            </Input>
          </Col>
          <Col xs="2" className="p-0">
            <Button onClick={this.props.addCoresponse}>Add</Button>
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
                    <Button
                      onClick={() => {
                        this.props.removeCoresponse(index);
                      }}
                    >
                      Remove
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
