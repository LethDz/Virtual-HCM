import React, { Component } from 'react';
import { Progress, Row } from 'reactstrap';

class StatusBar extends Component {
  render() {
    return (
      <Row>
        <Progress
          className="align-middle"
          color="success"
          animated
          value="50"
        />
      </Row>
    );
  }
}

export default StatusBar;
