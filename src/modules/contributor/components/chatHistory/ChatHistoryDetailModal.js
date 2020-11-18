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
  CardFooter,
} from 'reactstrap';
import 'src/static/stylesheets/chat.history.css';

class ChatHistoryDetailModal extends Component {
  constructor() {
    super();
    this.state = {
      tooltipOpen: false,
      data: {
        id: '1',
        contributor: 'Hoa',
        start: '9:00 14/11/2020',
        end: '12:00 14/11/2020',
        system: [
          {
            message:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            date: '9:00',
          },
          {
            message:
              'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
            date: '9:05',
          },
        ],
        send: [
          {
            message:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            date: '9:02',
          },
          {
            message:
              'But also the leap into electronic typesetting, remaining essentially unchanged. ',
            date: '9:07',
          },
        ],
      },
    };
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  };
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Chat History Detail
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col className="col-4">
                <Card>
                  <CardHeader>{this.state.data.contributor}</CardHeader>
                  <CardBody>
                    <Row className="list-details">
                      <span>{this.state.data.start}</span>
                      <small>Start</small>
                    </Row>
                    <Row className="list-details mt-2">
                      <span>{this.state.data.end}</span>
                      <small>End</small>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col className="chat-container col-8">
                <Card>
                  <CardHeader>Chat</CardHeader>
                  <CardBody>
                    <ul className="chat-list">
                      <li className="in">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>Raw denim heard of them tofu master cleanse</p>
                          </div>
                        </div>
                      </li>
                      <li className="out">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>Next level</p>
                          </div>
                        </div>
                      </li>
                      <li className="in">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>
                              Raw denim heard of them tofu master cleanse Raw
                              denim heard of them tofu master cleanseRaw denim
                              heard of them tofu master cleanse
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="out">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>
                              Next level Raw denim heard of them tofu master
                              cleanse Raw denim heard of them tofu master
                              cleanseRaw denim heard of them tofu master cleanse
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="in">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>Raw denim heard of them tofu master cleanse</p>
                          </div>
                        </div>
                      </li>
                      <li className="out">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>Next level</p>
                          </div>
                        </div>
                      </li>
                      <li className="in">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
                            <p>Raw denim heard of them tofu master cleanse</p>
                          </div>
                        </div>
                      </li>
                      <li className="out">
                        <div className="chat-body">
                          <span className="time_date">11:01 AM</span>
                          <div className="chat-message">
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
