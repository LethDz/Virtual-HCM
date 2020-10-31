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
  FormGroup,
} from "reactstrap";

class ReferenceModal extends Component {
  render() {
    return (
      <div className="ag-theme-alpine">
        <Container>
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
            <ModalHeader toggle={this.props.toggle}>
              Document Reference
            </ModalHeader>
            <ModalBody>
              <Form className="justify-content-center">
                <h5>ID: {this.props.data.reference_document_id}</h5>
                <FormGroup>
                  <Label>Reference name: </Label>
                  <Input
                    id="reference"
                    type="text"
                    value={this.props.data.reference_name}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Link: </Label>
                  <Input
                    id="reference"
                    type="text"
                    value={this.props.data.link}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Author: </Label>
                  <Input
                    id="reference"
                    type="text"
                    value={this.props.data.author}
                  />
                </FormGroup>

                <FormGroup>
                <Button className="r-button">Edit</Button>
                <Button className="r-button">Delete</Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    );
  }
}

export default ReferenceModal;
