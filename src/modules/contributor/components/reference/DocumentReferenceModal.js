import React, { Component } from 'react';
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
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import { handleInputChange } from 'src/common/handleInputChange';
import {
  getReferenceDetail,
  editReferenceDetail,
} from 'src/modules/contributor/index';
import { imgBase64, REFERENCE, EDIT, GET_REFERENCE } from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import { connect } from 'react-redux';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

class DocumentReferenceModal extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      reference_document_id: '',
      reference_name: '',
      link: '',
      author: '',
      cover: null,
      imagePath: null,
      id: '',
      loading: false,
      referenceDetail: {},
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

  componentDidMount = () => {
    this._isMounted = true;
    this.initiateData();
  };

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.imageSrc) {
      URL.revokeObjectURL(this.state.imageSrc);
    }
  }

  handleInput = (event) => handleInputChange(event, this);

  initiateData = () => {
    if (
      this.props.referenceDetail &&
      this.props.referenceDetail.reference_document_id ===
        parseInt(this.props.id)
    ) {
      this.setState({
        ...this.props.referenceDetail,
      });
    } else {
      this.setLoading(true);
      axiosClient
        .get(REFERENCE + GET_REFERENCE(this.props.id))
        .then((response) => {
          if (response.data.status) {
            const reference = response.data.result_data.references;
            this.props.getReferenceDetail(reference);
            this.setState({
              ...reference,
              loading: false,
              referenceDetail: reference
            });
          } else {
            this.setLoading(false);
          }
        });
    }
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  editReference = (event) => {
    event.preventDefault();
    let newReference = new FormData();
    newReference.append(
      'reference_document_id',
      this.state.reference_document_id
    );
    newReference.append('reference_name', this.state.reference_name);
    newReference.append('link', this.state.link);
    newReference.append('author', this.state.author);
    newReference.append('cover', this.state.imagePath);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.setState({ loading: true });
    axiosClient
      .post(REFERENCE + EDIT, newReference, config)
      .then((response) => {
        if (response.data.status) {
          const reference = response.data.result_data.references;
          this.props.editReferenceDetail(reference);
          this.setState({
            ...reference,
          });
        } else {
          console.log(response.data.status);
        }
      })
      .then(() => {});
    this.props.editReference();
    this.props.toggle();
  };

  deleteReference = () => {
    let id = new FormData();
    id.append('id', this.state.reference_document_id);
    this.props.deleteReference(id);
    this.props.toggle();
  };

  render() {
    return (
      <Container>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>
            Document Reference
          </ModalHeader>
          <Form onSubmit={this.editReference}>
            <ModalBody>
              <LoadingSpinner loading={this.state.loading} text={'Loading'} />
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
                            ? this.state.cover ===
                              this.state.referenceDetail.cover
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
                        required
                        value={this.state.reference_name}
                        onChange={this.handleInput}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Link: </Label>
                      <Input
                        name="link"
                        required
                        type="text"
                        value={this.state.link}
                        onChange={this.handleInput}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Author: </Label>
                      <Input
                        name="author"
                        required
                        type="text"
                        value={this.state.author}
                        onChange={this.handleInput}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
            </ModalBody>
            <ModalFooter>
              <Button className="r-button" type="submit">
                <FontAwesomeIcon icon={faEdit} color="white" />
                &nbsp;Edit
              </Button>

              <Button color="danger" onClick={this.deleteReference}>
                <FontAwesomeIcon icon={faTrash} color="white" />
                &nbsp;Delete
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  referenceDetail: getReferenceDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
  editReferenceDetail: (referenceDetail) =>
    dispatch(editReferenceDetail(referenceDetail)),
  getReferenceDetail: (reference) => dispatch(getReferenceDetail(reference)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentReferenceModal);
