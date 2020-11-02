import {
  faFrown,
  faPlus,
  faSmile,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import 'src/static/stylesheets/contributor.create.css';
import avatar from 'src/static/images/img_avatar.png';
import { ADMIN_ADD_USER } from 'src/constants';
import { connect } from 'react-redux';
import { addContributorToList } from 'src/modules/admin';
import { handleInputChange } from 'src/common/handleInputChange';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { changeToFormatDateVN, getDateNowToString } from 'src/common/getDate';

class ContributorCreate extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      imageSrc: null,
      username: '',
      fullname: '',
      gender: '0',
      phoneNumber: '',
      address: '',
      placeOfBirth: '',
      dateOfBirth: '',
      nationality: '',
      idNumber: '',
      imagePath: '',
      email: '',
      successAlert: false,
      errorAlert: false,
      loading: false,
      errorList: [],
    };
  }

  onUploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      this._isMounted && this.setState({ imageSrc: null });
      return;
    }

    const src = event.target.files[0];
    const objectURL = URL.createObjectURL(src);
    this._isMounted && this.setState({ imageSrc: objectURL, imagePath: src });
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

  inputChange = (event) => {
    handleInputChange(event, this);
  };

  onAddAccount = (event) => {
    event.preventDefault();
    this.setLoading(true);
    this.setErrorAlert(false);
    this.setSuccessAlert(false);

    let userData = new FormData();
    userData.append('username', this.state.username);
    userData.append('fullname', this.state.fullname);
    userData.append('nationality', this.state.nationality);
    userData.append('place_of_birth', this.state.placeOfBirth);
    userData.append(
      'date_of_birth',
      changeToFormatDateVN(this.state.dateOfBirth, '/')
    );
    userData.append('address', this.state.address);
    userData.append('id_number', this.state.idNumber);
    userData.append('phone_number', this.state.phoneNumber);
    userData.append('email', this.state.email);
    userData.append('avatar', this.state.imagePath);
    userData.append('gender', parseInt(this.state.gender));

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axiosClient
      .post(ADMIN_ADD_USER, userData, config)
      .then((response) => {
        if (response.data.status) {
          const user = response.data.result_data;
          this.props.addContributorToList(user);
          this.setSuccessAlert(true);
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

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setLoading = (status) => {
    this._isMounted &&
      this.setState({
        loading: status,
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

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text={'Loading'} />
        <Container className="cl-create-container">
          {this.state.successAlert && (
            <Row>
              <Alert
                color="success"
                isOpen={this.state.successAlert}
                toggle={() => this.onDismiss('successAlert')}
                className="m-3 w-100"
              >
                <FontAwesomeIcon icon={faSmile} />
                &nbsp; Add new account successfully
              </Alert>
            </Row>
          )}
          {this.state.errorAlert && (
            <Row>
              <Alert
                color="danger"
                isOpen={this.state.errorAlert}
                toggle={() => this.onDismiss('errorAlert')}
                className="m-3 w-100"
              >
                <FontAwesomeIcon icon={faFrown} />
                &nbsp;{' '}
                {this.state.errorList.length !== 0
                  ? this.state.errorList.map((element, index) => (
                      <li key={index + ' error'}>{element}</li>
                    ))
                  : 'Unexpected error has been occurred. Please Try Again !!!'}
              </Alert>
            </Row>
          )}
          <Row>
            <Col className="justify-content-center d-flex">
              <h5 className="mt-2 mb-2">Create Account</h5>
            </Col>
          </Row>
          <Form className="mt-5" onSubmit={this.onAddAccount}>
            <Row>
              <Col>
                <FormGroup row>
                  <Label for="username" sm={2}>
                    Username:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Enter username"
                      required
                      value={this.state.username}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="fullname" sm={2}>
                    Full Name:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="fullname"
                      id="fullname"
                      placeholder="Enter full name"
                      required
                      value={this.state.fullname}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="align-items-center">
                  <Label for="gender" sm={2}>
                    Gender:
                  </Label>
                  <Col sm={2} className="ml-2 align-self-center text-center">
                    <Input
                      type="radio"
                      name="gender"
                      id="male"
                      required
                      value={0}
                      checked={parseInt(this.state.gender) === 0}
                      onChange={this.inputChange}
                    />
                    &nbsp;Male
                  </Col>
                  <Col sm={2} className="ml-2 align-self-center text-center">
                    <Input
                      type="radio"
                      name="gender"
                      id="female"
                      value={1}
                      checked={parseInt(this.state.gender) === 1}
                      onChange={this.inputChange}
                    />
                    &nbsp;Female
                  </Col>
                  <Col sm={2} className="ml-2 align-self-center text-center">
                    <Input
                      type="radio"
                      name="gender"
                      id="unknown"
                      value={2}
                      checked={parseInt(this.state.gender) === 2}
                      onChange={this.inputChange}
                    />
                    &nbsp;Unknown
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="email" sm={2}>
                    Email:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter an email"
                      value={this.state.email}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="align-items-center">
                  <Label for="phoneNumber" sm={2}>
                    Phone number:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      placeholder="Enter phone number"
                      value={this.state.phoneNumber}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="address" sm={2}>
                    Address:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter address"
                      required
                      value={this.state.address}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="dateOfBirth" sm={2}>
                    Date of birth:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      min="1900-1-1"
                      max={getDateNowToString('-')}
                      required
                      value={this.state.dateOfBirth}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="placeOfBirth" sm={2}>
                    Place of birth:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="placeOfBirth"
                      id="placeOfBirth"
                      placeholder="Enter place of birth"
                      required
                      value={this.state.placeOfBirth}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="nationality" sm={2}>
                    Nationality:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="nationality"
                      id="nationality"
                      placeholder="Enter nationality"
                      required
                      value={this.state.nationality}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="idNumber" sm={2}>
                    ID number:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="idNumber"
                      id="idNumber"
                      placeholder="Enter id number"
                      required
                      value={this.state.idNumber}
                      onChange={this.inputChange}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col>
                <Row className="justify-content-center mb-3">
                  <img
                    type="image"
                    name="avatarImage"
                    id="avatarImage"
                    alt="avatar"
                    className="create-contributor-image"
                    src={this.state.imageSrc ? this.state.imageSrc : avatar}
                  ></img>
                </Row>
                <Row className="justify-content-center">
                  <div className="upload-btn-wrapper">
                    <Button color="primary" className="btn-upload-custom">
                      Upload avatar
                    </Button>
                    <Input
                      className="h-100 upload-hidden"
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/*"
                      onChange={this.onUploadImage}
                    />
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Row className="justify-content-end mr-1">
                  <Button type="reset">
                    <FontAwesomeIcon icon={faTimes} />
                    &nbsp; Cancel
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row className="justify-content-start mr-1">
                  <Button color="info" type="submit">
                    <FontAwesomeIcon icon={faPlus} />
                    &nbsp; Create
                  </Button>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addContributorToList: (contributor) =>
    dispatch(addContributorToList(contributor)),
});

export default connect(null, mapDispatchToProps)(ContributorCreate);
