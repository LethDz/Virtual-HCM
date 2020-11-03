import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import 'src/static/stylesheets/training.process.css';
import Terminal from 'terminal-in-react';

class ManageTrainingProcess extends Component {
  showMsg = () => 'Hello World';

  render() {
    return (
      <Container className="cl-container">
        <Row>
          <Col className="justify-content-center d-flex">
            <h5 className="mt-2 mb-2">Manage Training Process</h5>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex">
            <h6 className="mt-2 mb-2">Console Command: </h6>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Terminal
              color="green"
              backgroundColor="black"
              style={{ fontWeight: 'bold', fontSize: '1em' }}
              commands={{
                'open-google': (arg, print, runCommand) => {
                  window.open('https://www.google.com/', '_blank');
                  print('hello');
                  print('địt mẹ mày');
                  print('trường FPT ngu lồn');
                  print('địt cụ mày');
                  print('cái lồn mẹ mày to');
                  return 'opened';
                },
                show_msg: this.showMsg,
                popup: () => alert('Terminal in React'),
              }}
              descriptions={{
                'open-google': 'opens google.com',
                show_msg: 'shows a message',
                alert: 'alert',
                popup: 'alert',
              }}
              msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
              // hideTopBar={true}
              allowTabs={false}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ManageTrainingProcess;
