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
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import "src/static/stylesheets/reference.css";
import { handleInputChange } from "src/common/handleInputChange";

class CreateReferenceModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      reference_name: "",
      link: "",
      author: "",
      imageSrc: null,
      imagePath: "",
    };
  }

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

  onUploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      this._isMounted && this.setState({ imageSrc: null });
      return;
    }
    const src = event.target.files[0];
    const objectURL = URL.createObjectURL(src);
    this._isMounted && this.setState({ imageSrc: objectURL, imagePath: src });
  };

  addReference = () => {
    let newReference = new FormData();
    newReference.append("reference_name", this.state.reference_name);
    newReference.append("link", this.state.link);
    newReference.append("author", this.state.author);
    newReference.append("cover", this.state.imagePath);
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
              <Row className="justify-content-center mb-3">
                <img
                  type="image"
                  name="coverImage"
                  alt="cover"
                  className="cover-image"
                  src={this.state.imageSrc}
                ></img>
              </Row>
              <Row className="justify-content-center">
                <div className="upload-btn-wrapper">
                  <Button className="btn-upload-custom r-button">
                    <FontAwesomeIcon icon={faUpload} color="white" />
                    &nbsp; Upload
                  </Button>
                  <Input
                    className="h-100 upload-hidden"
                    type="file"
                    name="coverFile"
                    id="coverFile"
                    accept="image/*"
                    onChange={this.onUploadImage}
                  />
                </div>
              </Row>
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
