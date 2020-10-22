import React, { Component } from "react";
import {
  Col,
  Label,
  Row,
  Input,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { CriticalDataItem } from "src/modules/contributor/index";
class CriticalData extends Component {
  render() {
    const criticalType = ["PER", "LOC", "ORG", "MISC"];

    return (
      <Col>
        <Label>Subject</Label>
        <Row>
          <Col xs="auto">
            <Input type="select" id="critical-data-type">
              {criticalType.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </Input>
          </Col>

          <Col xs="auto">
            <Button onClick={this.props.addCriticalData}>Add</Button>
          </Col>
        </Row>
        <ListGroup className="mt-1">
          {this.props.criticalData.map((criticalData, index) => {
            return (
              <ListGroupItem key={index}>
                <Row>
                  <Col>
                    <Row>
                      {criticalData.type}: {criticalData.word}
                    </Row>
                  </Col>
                  <Col xs="auto">
                    <Button
                      onClick={() => {
                        this.props.removeCritical(index);
                      }}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col className="border-right-solid">
                    <Label>Subject component: </Label>
                    <CriticalDataItem
                      type="Critical"
                      index={index}
                      wordArray={this.props.wordArray}
                      setCriticalData={this.props.setCriticalData}
                    />
                    <ListGroup>
                      {this.props.criticalData[index].subjectComponents.map(
                        (word, index) => {
                          return (
                            <ListGroupItem className="mt-1" key={index}>
                              <Row>
                                <Col>
                                  {word.type}: {word.subjectComponent}
                                </Col>
                                <Col xs="auto">
                                  <Button
                                    onClick={() => {
                                      this.props.removeComponent(
                                        "Critical",
                                        criticalData.index,
                                        index
                                      );
                                    }}
                                  >
                                    Remove
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
                      type="Verb"
                      index={index}
                      wordArray={this.props.wordArray}
                      setVerb={this.props.setVerb}
                    />
                    <ListGroup>
                      {this.props.criticalData[index].verb.map(
                        (verb, index) => {
                          return (
                            <ListGroupItem className="mt-1" key={index}>
                              <Row>
                                <Col>
                                  {verb.type}: {verb.word}
                                </Col>
                                <Col xs="auto">
                                  <Button
                                    onClick={() => {
                                      this.props.removeComponent(
                                        "Verb",
                                        criticalData.index,
                                        index
                                      );
                                    }}
                                  >
                                    Remove
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
    );
  }
}

export default CriticalData;
