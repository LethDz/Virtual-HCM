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
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "src/static/stylesheets/reference.css";


class CreateReferenceModal extends Component {
  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Create New Document Reference
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
              <Label>Cover</Label>
              <Input type="url" placeholder="Cover link"/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
            <Button className="r-button">
              <FontAwesomeIcon icon={faPlus} color="white" />
              &nbsp; Create
            </Button>
          </ModalFooter>
      </Modal>
    );
  }
}

export default CreateReferenceModal;
