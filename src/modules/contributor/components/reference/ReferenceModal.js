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
      reference_document_id: "",
      reference_name: "",
      link: "",
      author: "",
      cover: null,
    };
  }

  handleInput = (event) => handleInputChange(event, this);

  initiateData = () => {
    this.setState({
      reference_document_id: this.props.data.reference_document_id,
      reference_name: this.props.data.reference_name,
      link: this.props.data.link,
      author: this.props.data.author,
      cover: this.props.data.cover,
    });
  };

  editReference = () => {
    let newReference = {
      reference_document_id: this.state.reference_document_id,
      reference_name: this.state.reference_name,
      link: this.state.link,
      author: this.state.author,
      cover: this.state.cover,
    };
    this.props.editReference(newReference);
    this.props.toggle();
  };

  render() {
    return (
      <Container>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          onOpened={this.initiateData}
        >
          <ModalHeader toggle={this.props.toggle}>
            Document Reference
          </ModalHeader>
          <ModalBody>
            <Form>
              <Label>
                <h5>ID: {this.state.reference_document_id}</h5>
              </Label>

              <FormGroup>
                <Label>Reference name: </Label>
                <Input
                  name="reference_name"
                  type="text"
                  value={this.state.reference_name}
                  onChange={this.handleInput}
                />
              </FormGroup>

              <FormGroup>
                <Label>Link: </Label>
                <Input
                  name="link"
                  type="text"
                  value={this.state.link}
                  onChange={this.handleInput}
                />
              </FormGroup>

              <FormGroup>
                <Label>Author: </Label>
                <Input
                  name="author"
                  type="text"
                  value={this.state.author}
                  onChange={this.handleInput}
                />
              </FormGroup>

              {/* <FormGroup>
                <Label>Cover</Label>
                <Input
                  type="file"
                  name="cover"
                  // value={this.state.cover}
                  onChange={this.handleInput}
                />
              </FormGroup> */}
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button className="r-button" onClick={this.editReference}>
              <FontAwesomeIcon icon={faEdit} color="white" />
              &nbsp;Edit
            </Button>
            <Button color="danger">
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
