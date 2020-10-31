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
  ModalFooter,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { handleInputChange } from "src/common/handleInputChange";

class ReferenceModal extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleInput = (event) => handleInputChange(event, this);

  render() {
    return (
      <Container>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            Document Reference
          </ModalHeader>
          <ModalBody>
            <Form>
              <Label>
                <h5>ID: {this.props.data.reference_document_id}</h5>
              </Label>

              <FormGroup>
                <Label>Reference name: </Label>
                <Input
                  id="reference"
                  type="text"
                  value={this.props.data.reference_name}
                  onChange={this.handleInput}
                />
              </FormGroup>

              <FormGroup>
                <Label>Link: </Label>
                <Input
                  id="reference"
                  type="text"
                  value={this.props.data.link}
                  onChange={this.handleInput}
                />
              </FormGroup>

              <FormGroup>
                <Label>Author: </Label>
                <Input
                  id="reference"
                  type="text"
                  value={this.props.data.author}
                  onChange={this.handleInput}
                />
              </FormGroup>

              <FormGroup>
                <Label>Cover</Label>
                <Input 
                type="file" 
                name="Change cover"
                // value={this.props.data.cover}
                onChange={this.handleInput}
                 />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button className="r-button">
              <FontAwesomeIcon icon={faEdit} color="white" />
              &nbsp;Edit
            </Button>
            <Button 
            color="danger" 
            >
              <FontAwesomeIcon icon={faTrash} color="white" />
              &nbsp;Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default ReferenceModal;
