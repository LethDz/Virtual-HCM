import React, { Component } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';

class BaseResponse extends Component {
  render() {
    return (
      <Row xs="1">
        <Col>
          <Label className="label" for="baseResponse">
            Base response:
          </Label>
          {this.props.disable ? (<h5>{this.props.baseResponseValue}</h5>) :
            <Input
              disabled={this.props.disable}
              placeholder="Enter base response here"
              required
              type="textarea"
              name="baseResponse"
              value={this.props.baseResponseValue}
              onChange={this.props.onChange}
            />}

        </Col>
      </Row>
    );
  }
}

export default BaseResponse;
