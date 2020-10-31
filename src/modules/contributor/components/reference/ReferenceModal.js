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

  render() {
    return (
      <div className="ag-theme-alpine">
        <Container>
          <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
              Document Reference
            </ModalHeader>
            <ModalBody>
              <h5>ID: {this.props.data.reference_document_id}</h5>
              <Form>
                <Row>
                  <Col xs="3">
                    <Label>Reference name: </Label>
                  </Col>
                  <Col xs="6">
                    <Input
                      id="reference"
                      type="text"
                      value={this.props.data.reference_name}
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
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default ReferenceModal;
