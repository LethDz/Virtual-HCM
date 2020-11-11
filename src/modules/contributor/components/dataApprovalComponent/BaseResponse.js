import React, { Component } from 'react';
import { Row, Col, Label, Input } from 'reactstrap';

class BaseResponse extends Component {
  render() {
    return (
      <Row className="p-3" xs="1">
        <Col>
          <Label for="baseResponse">Base response</Label>
          <Input
            required
            type="textarea"
            name="baseResponse"
            value={this.props.baseResponseValue}
            onChange={this.props.onChange}
          />
        </Col>
      </Row>
    );
  }
}

export default BaseResponse;
