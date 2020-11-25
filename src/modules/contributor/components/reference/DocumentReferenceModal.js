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
  pullReferenceDetail,
  deleteReference,
  getAllDocumentReference,
} from 'src/modules/contributor';
import {
  imgBase64,
  REFERENCE,
  EDIT,
  GET_REFERENCE,
  DELETE_REFERENCE,
} from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import { connect } from 'react-redux';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import cover from 'src/static/images/cover.png';

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
      loading: false,
      errorAlert: false,
      successAlert: false,
      errorList: [],
    };
  }

  onUploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      this._isMounted &&
        this.setState({ avatar: this.props.referenceDetail.cover });
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
            this.props.pullReferenceDetail(reference);
            this.setState({
              ...reference,
            });
          } else {
            this.setErrorAlert(true);
            this.setErrorList(response.data.messages);
          }
          this.setLoading(false);
        })
        .catch(() => {
          this.setLoading(false);
          this.setErrorAlert(true);
          this.setSuccessAlert(false);
        });
    }
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
      });
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setSuccessAlert = (status) => {
    this._isMounted &&
      this.setState({
        successAlert: status,
      });
  };

  setErrorAlert = (status) => {
    this._isMounted &&
      this.setState({
        errorAlert: status,
      });
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
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
    this.state.imagePath && newReference.append('cover', this.state.imagePath);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    this.setLoading(true);
    axiosClient
      .post(REFERENCE + EDIT, newReference, config)
      .then((response) => {
        if (response.data.status) {
          const reference = response.data.result_data;
          this.props.editReferenceDetail(reference);
          this.setState({
            ...reference,
          });
          this.props.updateReferenceList([]);
          this.setSuccessAlert(true);
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .then(() => {
        this.props.updateReferenceList(this.props.referenceList);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  deleteReference = () => {
    this.setLoading(true);
    axiosClient
      .get(REFERENCE + DELETE_REFERENCE(this.props.id))
      .then((response) => {
        if (response.data.status) {
          this.props.deleteReference(this.props.id);
          this.props.updateReferenceList(this.props.referenceList);
          this.props.toggle();
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  toggle = () => {
    !this.state.loading && this.props.toggle();
  };

  render() {
    return (
      <Container>
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggle}>Document Reference</ModalHeader>
          <Form onSubmit={this.editReference}>
            <ModalBody>
              <LoadingSpinner loading={this.state.loading} text={'Loading'} />
              {this.state.successAlert && (
                <SuccessAlert
                  successAlert={this.state.successAlert}
                  text="Editing reference is successfully"
                  onDismiss={() => this.onDismiss('successAlert')}
                />
              )}
              {this.state.errorAlert && (
                <ErrorAlert
                  errorAlert={this.state.errorAlert}
                  errorList={this.state.errorList}
                  onDismiss={() => this.onDismiss('errorAlert')}
                />
              )}
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
                            this.props.referenceDetail.cover
                            ? imgBase64(this.state.cover)
                            : this.state.cover
                          : cover
                      }
                    ></img>
                  </Row>
                  <Row className="justify-content-center upload-btn-wrapper-reference-modal">
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
                      type="url"
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                disabled={this.state.loading}
              >
                <FontAwesomeIcon icon={faEdit} color="white" />
                &nbsp;Edit
              </Button>
              <Button
                color="danger"
                onClick={this.deleteReference}
                disabled={this.state.loading}
              >
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
  referenceList: getAllDocumentReference(state),
});

const mapDispatchToProps = (dispatch) => ({
  editReferenceDetail: (referenceDetail) =>
    dispatch(editReferenceDetail(referenceDetail)),
  pullReferenceDetail: (reference) => dispatch(pullReferenceDetail(reference)),
  deleteReference: (id) => dispatch(deleteReference(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentReferenceModal);
