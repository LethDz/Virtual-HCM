import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import "src/static/stylesheets/reference.css";

class CreateReferenceModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.modal}>
        <ModalHeader toggle={!this.props.modal}>
          Add New Document Reference
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Reference name</Label>
              <Input type="text" placeholder="Reference name" />
            </FormGroup>

            <FormGroup>
              <Label>Author</Label>
              <Input type="text" placeholder="Author" />
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input type="text" placeholder="Link" />
            </FormGroup>

            <FormGroup>
              <Label>Reference type</Label>
              <Input type="select" name="select" id="referenceType">
                <option value="book">Book</option>
                <option value="link">Link</option>
              </Input>
            </FormGroup>
            <Button className="r-button">Add</Button>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default CreateReferenceModal;
