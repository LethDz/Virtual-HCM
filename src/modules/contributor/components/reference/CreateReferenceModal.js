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
import { handleInputChange } from "src/common/handleInputChange";

class CreateReferenceModal extends Component {
  constructor() {
    super();
    this.state = {
      reference: {
        reference_name: "",
        link: "",
        author: "",
        cover: null,
      },
    };
  }

  handleInput = (event) => handleInputChange(event, this);

  addReference = () => {
    this.props.addReference(this.state.reference);
    this.props.toggle();
  };

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
              <Input
                required
                type="text"
                placeholder="Reference name"
                value={this.state.reference.reference_name}
                onChange={this.handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Label>Author</Label>
              <Input
                required
                type="text"
                placeholder="Author"
                value={this.state.reference.author}
                onChange={this.handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input
                required
                type="text"
                placeholder="Link"
                value={this.state.reference.link}
                onChange={this.handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Label>Cover</Label>
              <Input
                required
                type="file"
                placeholder="Cover"
                value={this.state.reference.cover}
                onChange={this.handleInput}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button 
          className="r-button"
          onClick = {this.addReference}
          >
            <FontAwesomeIcon icon={faPlus} color="white" />
            &nbsp; Create
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateReferenceModal;
