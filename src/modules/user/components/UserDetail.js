import {
  faCheck,
  faEraser,
  faSave,
  faSync,
  faTimes,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component, Fragment } from 'react';
import {
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
import {
  ADMIN_EDIT_USER,
  ADMIN_GET_USER,
  imgBase64,
  USER_EDIT_PROFILE,
} from 'src/constants';
import { connect } from 'react-redux';
import {
  getContributorDetail,
  editContributor,
  pullContributor,
  BtnChangeStatus,
} from 'src/modules/admin';
import { handleInputChange } from 'src/common/handleInputChange';
import axiosClient from 'src/common/axiosClient';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import {
  changeToFormatDateVN,
  getDateNowToString,
  isoFormatDate,
} from 'src/common/getDate';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import { getUserData } from 'src/common/authorizationChecking';

class UserDetail extends Component {
  _isMounted = false;
  currentUser = getUserData();
  constructor() {
    super();
    this.state = {
      avatar_edit: 0,
      avatar: null,
      username: '',
      fullname: '',
      gender: '0',
      phone_number: '',
      address: '',
      place_of_birth: '',
      date_of_birth: '',
      nationality: '',
      id_number: '',
      imagePath: null,
      active: false,
      successAlert: false,
      loading: false,
      errorAlert: false,
      email: '',
      errorList: [],
    };

    this.titleRef = React.createRef();
    this.imgRef = React.createRef();
  }

  onUploadImage = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      this._isMounted &&
        this.setState({ avatar: this.props.contributorDetail.avatar });
      return;
    }

    const src = event.target.files[0];
    const objectURL = URL.createObjectURL(src);
    this._isMounted &&
      this.setState({ avatar: objectURL, imagePath: src, avatar_edit: 1 });
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadData();
  }

  loadData = () => {
    this.setLoading(true);
    axiosClient
      .get(ADMIN_GET_USER(this.props.id))
      .then((response) => {
        if (response.data.status) {
          const user = response.data.result_data;
          this.props.pullContributor(user);
          this.setState({
            ...user,
            phone_number: user.phone_number ? user.phone_number : '',
            date_of_birth: isoFormatDate(user.date_of_birth),
            email: user.email ? user.email : '',
          });
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
      })
      .catch((error) => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
      });
  };

  componentWillUnmount() {
    this._isMounted = false;
    if (this.state.imageSrc) {
      URL.revokeObjectURL(this.state.imageSrc);
    }
  }

  componentDidUpdate() {
    if (
      this._isMounted &&
      !this.state.loading &&
      this.props.contributorDetail &&
      parseInt(this.props.id) !== this.props.contributorDetail.user_id
    ) {
      this.loadData();
    }
  }

  inputChange = (event) => {
    handleInputChange(event, this);
  };

  onUpdateAccount = (event) => {
    event.preventDefault();
    this.setLoading(true);
    this.setErrorAlert(false);
    this.setSuccessAlert(false);

    let userData = new FormData();
    if (this.currentUser.admin) {
      userData.append('id', this.props.contributorDetail.user_id);
      userData.append('fullname', this.state.fullname);
      userData.append('nationality', this.state.nationality);
      userData.append('place_of_birth', this.state.place_of_birth);
      userData.append(
        'date_of_birth',
        changeToFormatDateVN(this.state.date_of_birth, '/')
      );
      userData.append('id_number', this.state.id_number);
      userData.append('gender', parseInt(this.state.gender));
    }

    userData.append('address', this.state.address);
    userData.append('phone_number', this.state.phone_number);
    userData.append('email', this.state.email);
    this.state.imagePath && userData.append('avatar', this.state.imagePath);
    userData.append('avatar_edit', this.state.avatar_edit);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    // If current user is admin use Admin edit API or else.
    axiosClient
      .post(
        this.currentUser.admin ? ADMIN_EDIT_USER : USER_EDIT_PROFILE,
        userData,
        config
      )
      .then((response) => {
        if (response.data.status) {
          const user = response.data.result_data;
          this.props.editContributor(user);
          this.setState({
            ...user,
            phone_number: user.phone_number ? user.phone_number : '',
            date_of_birth: isoFormatDate(user.date_of_birth),
            email: user.email ? user.email : '',
            avatar_edit: 0,
          });
          this.imgRef.current.value = null;
          this.setSuccessAlert(true);
          if (this.currentUser.user_id === user.user_id) {
            localStorage.setItem('user', JSON.stringify(user));
          }
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response.data.messages);
        }
        this.setLoading(false);
        this.scrollToRef();
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setSuccessAlert(false);
        this.scrollToRef();
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

  onReset = () => {
    this._isMounted &&
      this.setState({
        ...this.props.contributorDetail,
        imagePath: null,
        phone_number: this.props.contributorDetail.phone_number
          ? this.props.contributorDetail.phone_number
          : '',
        date_of_birth: isoFormatDate(
          this.props.contributorDetail.date_of_birth
        ),
        email: this.props.contributorDetail.email
          ? this.props.contributorDetail.email
          : '',
        avatar_edit: 0,
      });
    this.imgRef.current.value = null;
    this.scrollToRef();
  };

  setErrorList = (list) => {
    this._isMounted &&
      this.setState({
        errorList: list,
      });
  };

  setAccountStatus = (status) => {
    this._isMounted &&
      this.setState({
        active: status,
      });
  };

  scrollToRef = () => {
    this.titleRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  isEditable = () => {
    return (
      this.currentUser.admin ||
      parseInt(this.props.id) === this.currentUser.user_id
    );
  };

  eraseAvatar = () => {
    this._isMounted &&
      this.setState({
        imagePath: null,
        avatar: null,
        avatar_edit: 1,
      });
    this.imgRef.current.value = null;
  };

  render() {
    return (
      <Fragment>
        <LoadingSpinner loading={this.state.loading} text={'Loading'} />
        <Container className="cl-create-container">
          {this.state.successAlert && (
            <SuccessAlert
              successAlert={this.state.successAlert}
              text="Edit account successfully"
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
            <Col className="justify-content-center d-flex">
              <h5 className="mt-2 mb-2" ref={this.titleRef}>
                User Detail
              </h5>
            </Col>
          </Row>
          <Form className="mt-5" onSubmit={this.onUpdateAccount}>
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
                      disabled
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
                      disabled={!this.currentUser.admin}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
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
                      disabled={!this.currentUser.admin}
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
                      disabled={!this.currentUser.admin}
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
                      disabled={!this.currentUser.admin}
                    />
                    &nbsp;Unknown
                  </Col>
                </FormGroup>
                <FormGroup row className="align-items-center">
                  <Label for="phoneNumber" sm={2}>
                    Phone number:
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="phone_number"
                      id="phoneNumber"
                      placeholder="Enter phone number"
                      value={this.state.phone_number}
                      onChange={this.inputChange}
                      disabled={!this.isEditable()}
                    />
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
                      disabled={!this.isEditable()}
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
                      disabled={!this.isEditable()}
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
                      name="date_of_birth"
                      id="dateOfBirth"
                      min="1900-1-1"
                      max={getDateNowToString('-')}
                      required
                      value={this.state.date_of_birth}
                      onChange={this.inputChange}
                      disabled={!this.currentUser.admin}
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
                      name="place_of_birth"
                      id="placeOfBirth"
                      placeholder="Enter place of birth"
                      required
                      value={this.state.place_of_birth}
                      onChange={this.inputChange}
                      disabled={!this.currentUser.admin}
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
                      disabled={!this.currentUser.admin}
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
                      name="id_number"
                      id="idNumber"
                      placeholder="Enter id number"
                      required
                      value={this.state.id_number}
                      onChange={this.inputChange}
                      disabled={!this.currentUser.admin}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="align-items-center">
                  <Label for="status" sm={2}>
                    Status:
                  </Label>
                  {!this.currentUser.admin ? (
                    <div id="status">
                      <span
                        className={`${
                          this.state.active ? 'text-success' : 'text-danger'
                        } mr-1`}
                      >
                        <FontAwesomeIcon
                          icon={this.state.active ? faCheck : faTimes}
                          color={this.state.active ? 'green' : 'red'}
                        />{' '}
                        {this.state.active ? 'Active' : 'Disabled'}
                      </span>
                    </div>
                  ) : (
                    <Col sm={10}>
                      <BtnChangeStatus
                        id="status"
                        data={this.props.contributorDetail}
                        context={this}
                        value={this.state.active}
                        editPage={true}
                      />
                    </Col>
                  )}
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
                    src={
                      this.state.avatar
                        ? this.state.avatar ===
                          this.props.contributorDetail.avatar
                          ? imgBase64(this.state.avatar)
                          : this.state.avatar
                        : avatar
                    }
                  ></img>
                </Row>
                {this.isEditable() && (
                  <Fragment>
                    <Row className="justify-content-center">
                      <div className="upload-btn-wrapper">
                        <Button color="primary" className="btn-upload-custom">
                          <FontAwesomeIcon icon={faUpload} />
                          &nbsp; Upload avatar
                        </Button>
                        <Input
                          innerRef={this.imgRef}
                          className="h-100 upload-hidden"
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept="image/*"
                          onChange={this.onUploadImage}
                        />
                      </div>
                      {this.props.contributorDetail &&
                        this.props.contributorDetail.avatar && (
                          <Button
                            color="danger"
                            onClick={this.eraseAvatar}
                            className="ml-1"
                            disabled={!this.state.avatar}
                          >
                            <FontAwesomeIcon icon={faEraser} />
                            &nbsp; Erase Avatar
                          </Button>
                        )}
                    </Row>
                  </Fragment>
                )}
              </Col>
            </Row>
            {this.isEditable() && (
              <Row className="mt-4">
                <Col>
                  <Row className="justify-content-end mr-1">
                    <Button onClick={this.onReset}>
                      <FontAwesomeIcon icon={faSync} />
                      &nbsp; Reset
                    </Button>
                  </Row>
                </Col>
                <Col>
                  <Row className="justify-content-start mr-1">
                    <Button color="info" type="submit">
                      <FontAwesomeIcon icon={faSave} />
                      &nbsp; Save
                    </Button>
                  </Row>
                </Col>
              </Row>
            )}
          </Form>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  contributorDetail: getContributorDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
  editContributor: (contributorDetail) =>
    dispatch(editContributor(contributorDetail)),
  pullContributor: (contributor) => dispatch(pullContributor(contributor)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
