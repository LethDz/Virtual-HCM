import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Col,
} from 'reactstrap';
import 'src/static/stylesheets/chat.history.css';

class ChatHistoryDetailModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Chat History Detail
        </ModalHeader>
        <ModalBody>
          <Container className="content">
            <Row>
              <Col className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Card>
                  <CardHeader>Chat</CardHeader>
                  <CardBody className="height3">
                    <ul className="chat-list">
                      <li className="in">
                        <div className="chat-body">
                          <div className="chat-message">
                            <h5>Hoa</h5>
                            <p>Raw denim heard of them tofu master cleanse</p>
                          </div>
                        </div>
                      </li>
                      <li className="out">
                        <div className="chat-body">
                          <div className="chat-message">
                            <h5>Serena</h5>
                            <p>Next level</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    );
  }
}

export default ChatHistoryDetailModal;
