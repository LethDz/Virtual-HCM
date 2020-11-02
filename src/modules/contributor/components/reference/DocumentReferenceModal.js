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
  Col,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import { handleInputChange } from "src/common/handleInputChange";
import { imgBase64 } from "src/constants";

class DocumentReferenceModal extends Component {
  constructor() {
    super();
    this.state = {
      reference_document_id: "",
      reference_name: "",
      link: "",
      author: "",
      cover: null,
      imagePath: null,
    };
  }

  onUploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      this._isMounted && this.setState({ avatar: this.props.data.cover });
      return;
    }

    const src = event.target.files[0];
    const objectURL = URL.createObjectURL(src);
    this._isMounted && this.setState({ cover: objectURL, imagePath: src });
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.imageSrc) {
      URL.revokeObjectURL(this.state.imageSrc);
    }
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
    let newReference = new FormData();
    newReference.append(
      "reference_document_id",
      this.state.reference_document_id
    );
    newReference.append("reference_name", this.state.reference_name);
    newReference.append("link", this.state.link);
    newReference.append("author", this.state.author);
    newReference.append("cover", this.state.imagePath);
    this.props.editReference(newReference);
    this.props.toggle();
  };

  deleteReference = () => {
    let id = new FormData();
    id.append("id", this.state.reference_document_id);
    this.props.deleteReference(id);
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
              <Container>
                <Row>
                  <Col className="col-3">
                    <Row className="justify-content-center mb-3">
                      <img
                        type="image"
                        name="cover"
                        id="coverImage"
                        alt="cover"
                        className="cover-image"
                        src={
                          this.state.cover
                            ? this.state.cover === this.props.data.cover
                              ? imgBase64(this.state.cover)
                              : this.state.cover
                            : null
                        }
                      ></img>
                    </Row>
                    <Row className="justify-content-center upload-btn-wrapper">
                      <Button color="warning">
                        <FontAwesomeIcon icon={faFolderOpen} color="white" />
                      </Button>
                      <Input
                        className="h-100 upload-hidden"
                        type="file"
                        name="avatar"
                        id="avatar"
                        accept="image/*"
                        onChange={this.onUploadImage}
                      />
                    </Row>
                  </Col>
                  <Col className="col-9">
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
                  </Col>
                </Row>
              </Container>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button className="r-button" onClick={this.editReference}>
              <FontAwesomeIcon icon={faEdit} color="white" />
              &nbsp;Edit
            </Button>
            <Button color="danger" onClick={this.deleteReference}>
              <FontAwesomeIcon icon={faTrash} color="white" />
              &nbsp;Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default DocumentReferenceModal;
