import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import { USER_CHANGE_PASSWORD, WRONG_PASSWORD } from 'src/constants';

export default class ChangePassword extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: false,
      successAlert: false,
      current_password: '',
      new_password: '',
      confirm_new_password: '',
      passwordInvalid: false,
      newPasswordInvalid: false,
      newPasswordValid: false,
      errorAlert: false,
      errorList: [],
    };

    this.passwordRef = React.createRef();
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  inputChange = async (event) => {
    await handleInputChange(event, this);
    if (this.state.new_password !== this.state.confirm_new_password) {
      this.setNewPasswordInvalid(true);
      this.setNewPasswordValid(false);
    }

    if (
      this.state.new_password !== '' &&
      this.state.new_password === this.state.confirm_new_password
    ) {
      this.setNewPasswordInvalid(false);
      this.setNewPasswordValid(true);
    }
  };

  toggleModal = () => {
    !this.state.loading && this.props.setOpenChangePassword(false);
  };

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setNewPasswordInvalid = (status) => {
    this._isMounted &&
      this.setState({
        newPasswordInvalid: status,
      });
  };

  setNewPasswordValid = (status) => {
    this._isMounted &&
      this.setState({
        newPasswordValid: status,
      });
  };

  setPasswordInvalid = (status) => {
    this._isMounted &&
      this.setState({
        passwordInvalid: status,
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

  setErrorList = (error) => {
    this._isMounted &&
      this.setState({
        errorList: error,
      });
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.current_password === '' ||
      this.state.confirm_new_password === '' ||
      this.state.confirm_new_password !== this.state.new_password
    ) {
      return;
    }

    this.setPasswordInvalid(false);
    this.setLoading(true);
    this.setSuccessAlert(false);
    this.setErrorAlert(false);
    this.setErrorList([]);

    const data = {
      new_password: this.state.confirm_new_password,
      current_password: this.state.current_password,
    };

    axiosClient
      .post(USER_CHANGE_PASSWORD, data)
      .then((response) => {
        if (response.data.status) {
          this.setSuccessAlert(true);
          this.resetForm();
        } else {
          if (WRONG_PASSWORD === response?.data?.messages[0]) {
            this.setPasswordInvalid(true);
          }
        }
        this.setLoading(false);
      })
      .catch((error) => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setErrorList([error?.response?.data?.result_data?.error_detail]);
      });
  };

  resetForm = () => {
    this._isMounted &&
      this.setState({
        current_password: '',
        new_password: '',
        confirm_new_password: '',
        passwordInvalid: false,
        newPasswordInvalid: false,
        newPasswordValid: false,
      });
  };

  render() {
    return (
      <Modal
        isOpen={this.props.openChangePassword}
        toggle={this.toggleModal}
        unmountOnClose={true}
        backdrop="static"
        onOpened={() => this.passwordRef.current.focus()}
      >
        <LoadingSpinner
          loading={this.state.loading}
          text={'Loading'}
          type="MODAL"
        >
          <ModalHeader toggle={this.toggleModal}>Change password</ModalHeader>
          <Form className="m-0" onSubmit={this.onSubmit}>
            <ModalBody>
              <FormGroup className="w-100">
                {this.state.successAlert && (
                  <SuccessAlert
                    successAlert={this.state.successAlert}
                    text="Update password successfully"
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
                <Label for="current_password" className="form-login-title">
                  Old password:
                </Label>
                <Input
                  innerRef={this.passwordRef}
                  type="password"
                  name="current_password"
                  id="current_password"
                  placeholder="Enter your old password"
                  value={this.state.current_password}
                  onChange={this.inputChange}
                  required
                  invalid={this.state.passwordInvalid}
                />
                <FormFeedback>{WRONG_PASSWORD}</FormFeedback>
              </FormGroup>
              <FormGroup className="w-100">
                <Label for="new_password" className="form-login-title">
                  New password:
                </Label>
                <Input
                  type="password"
                  name="new_password"
                  id="new_password"
                  placeholder="Enter your new password"
                  value={this.state.new_password}
                  onChange={this.inputChange}
                  required
                />
              </FormGroup>
              <FormGroup className="w-100">
                <Label for="confirm_new_password" className="form-login-title">
                  Confirm new password:
                </Label>
                <Input
                  type="password"
                  name="confirm_new_password"
                  id="confirm_new_password"
                  placeholder="Retype your new password"
                  value={this.state.confirm_new_password}
                  onChange={this.inputChange}
                  required
                  valid={this.state.newPasswordValid}
                  invalid={this.state.newPasswordInvalid}
                />
                <FormFeedback valid>Sweet! Valid New Password</FormFeedback>
                <FormFeedback>
                  New password field and confirm field is not match !
                </FormFeedback>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="info" type="submit" disabled={this.state.loading}>
                <FontAwesomeIcon icon={faSave} color="white" />
                &nbsp; Update Password
              </Button>{' '}
              <Button
                color="secondary"
                onClick={this.toggleModal}
                disabled={this.state.loading}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </LoadingSpinner>
      </Modal>
    );
  }
}
