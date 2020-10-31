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
      reference_name: "",
      link: "",
      author: "",
      cover: null,
    };
  }

  onFileChange = (event) => { 
    this.setState({ cover: event.target.files[0] }); 
  }; 

  handleInput = (event) => handleInputChange(event, this);

  addReference = () => {
    let cover = this.state.cover;
    let formData = new FormData();
    formData.append('image', cover);
    formData.append('name', cover.name);
    let newReference = {
      reference_name: this.state.reference_name,
      link: this.state.link,
      author: this.state.author,
      cover: formData,
    };
    this.props.addReference(newReference);
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
                name="reference_name"
                placeholder="Reference name"
                value={this.state.reference_name}
                onChange={this.handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Label>Author</Label>
              <Input
                required
                type="text"
                name="author"
                placeholder="Author"
                value={this.state.author}
                onChange={this.handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Label>Link</Label>
              <Input
                required
                type="text"
                name="link"
                placeholder="Link"
                value={this.state.link}
                onChange={this.handleInput}
              />
            </FormGroup>

            <FormGroup>
              <Label>Cover</Label>
              <Input
                required
                type="file"
                placeholder="Cover"
                name="cover"
                // value={this.state.cover}
                onChange={this.onFileChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className="r-button" onClick={this.addReference}>
            <FontAwesomeIcon icon={faPlus} color="white" />
            &nbsp; Create
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default CreateReferenceModal;
