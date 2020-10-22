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
      <Col xs="7">
        <Label>Critical data</Label>
        <Row>
          <Col xs="auto">
            <Input type="select" id="critical-data-type">
              {criticalType.map((value, index) => {
                return <option key={index}>{value}</option>;
              })}
            </Input>
          </Col>
          <Col>
            <Input type="select" id="critical-data-index">
              {this.props.wordArray.map((data, index) => {
                return <option key={index}>{data.value}</option>;
              })}
            </Input>
          </Col>
          <Col xs="auto" className="p-0">
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
                    <CriticalDataItem
                      index={criticalData.index}
                      wordArray={this.props.wordArray}
                      setVerb={this.props.setVerb}
                    />
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
