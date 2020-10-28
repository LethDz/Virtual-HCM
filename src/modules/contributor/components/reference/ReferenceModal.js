import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Col,
  Row,
} from "reactstrap";

class ReferenceModal extends Component {
  setModal = () => {
    let currentState = this.state;
    currentState.modal = !currentState.modal;
    this.setState(currentState);
  };

  render() {
    return (
      <div className="ag-theme-alpine">
        <Container>
          <Modal isOpen={this.props.modal}>
            <ModalHeader>Document Reference</ModalHeader>
            <ModalBody>
              <h5>ID: {this.props.data.id}</h5>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                  <Col xs="3">
                    <Label>Reference name: </Label>
                  </Col>
                  <Col xs="6">
                    <Input
                      id="reference"
                      type="text"
                      value={this.props.data.reference}
                    />
                  </Col>
                  <Col xs="3">
                    <Button className="r-button">Edit</Button>
                  </Col>
                </Row>

                <Row>
                  <Col xs="3">
                    <Label>Author: </Label>
                  </Col>
                  <Col xs="6">
                    <Input
                      id="reference"
                      type="text"
                      value={this.props.data.author}
                    />
                  </Col>
                  <Col xs="3"></Col>
                </Row>

                <Row>
                  <Col xs="3">
                    <Label>Link: </Label>
                  </Col>
                  <Col xs="6">
                    <Input
                      id="reference"
                      type="text"
                      value={this.props.data.link}
                    />
                  </Col>
                  <Col xs="3">
                    <Button className="r-button">Delete</Button>
                  </Col>
                </Row>

                <Row>
                  <Col xs="3">
                    <Label>Reference type: </Label>
                  </Col>
                  <Col xs="6">
                    <Input type="select" name="select" id="referenceType">
                      <option value="book">Book</option>
                      <option value="link">Link</option>
                    </Input>
                  </Col>
                  <Col xs="3"></Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default ReferenceModal;
