import React, { Component, Fragment } from 'react';
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ReCaptchaWidget from 'src/common/ReCaptchaWidget';
import {
  HOME_PAGE,
  LOGIN_PAGE,
  USER_CHECK_RESET_PASSWORD_SESSION,
  USER_RESET_PASSWORD,
} from 'src/constants';

export default class ResetPassword extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: true,
      errorAlert: false,
      errorList: [],
      successAlert: false,
      new_password: '',
      confirm_new_password: '',
      needVerifyRobot: true,
      newPasswordInvalid: false,
      newPasswordValid: false,
      invalidUid: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    axiosClient
      .post(USER_CHECK_RESET_PASSWORD_SESSION, { uid: this.props.uid })
      .then((response) => {
        if (response?.data?.status) {
          this.setInvalidUid(false);
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response?.data?.messages);
          this.setInvalidUid(true);
        }
        this.setLoading(false);
      })
      .catch(() => {
        this.setLoading(false);
        this.setErrorAlert(true);
        this.setInvalidUid(true);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onDismiss = (name) => {
    this._isMounted &&
      this.setState({
        [name]: false,
      });
  };

  setInvalidUid = (status) => {
    this._isMounted &&
      this.setState({
        invalidUid: status,
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

  handleInput = async (event) => {
    await handleInputChange(event, this);
    !this.state.needVerifyRobot && this.setNeedVerifyRobot(true);
    if (
      this.state.new_password === '' &&
      this.state.confirm_new_password === ''
    ) {
      this.setNewPasswordInvalid(false);
      this.setNewPasswordValid(false);
    }

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

  setNeedVerifyRobot = (status) => {
    this._isMounted &&
      this.setState({
        needVerifyRobot: status,
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

  onSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.confirm_new_password === '' ||
      this.state.new_password !== this.state.confirm_new_password ||
      this.state.needVerifyRobot ||
      !this.props.uid
    ) {
      return;
    }

    this.setLoading(true);
    this.setErrorAlert(false);
    this.setSuccessAlert(false);

    const data = {
      uid: this.props.uid,
      new_password: this.state.confirm_new_password,
    };

    axiosClient
      .post(USER_RESET_PASSWORD, data)
      .then((response) => {
        if (response?.data?.status) {
          this.setSuccessAlert(true);
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response?.data?.messages);
        }
        this.setNeedVerifyRobot(true);
        this.setLoading(false);
      })
      .catch(() => {
        this.setErrorAlert(true);
        this.setLoading(false);
        this.setNeedVerifyRobot(true);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="icon-bot"></div>
        <h1 className="login-form-title">Change Password</h1>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text="Reset password successfully"
          />
        )}
        {this.state.errorAlert && (
          <ErrorAlert
            errorAlert={this.state.errorAlert}
            errorList={this.state.errorList}
            onDismiss={() => this.onDismiss('errorAlert')}
          />
        )}
        <div>
          <LoadingSpinner loading={this.state.loading} text="Loading">
            {this.state.successAlert && !this.state.errorAlert && (
              <div className="login-form-m align-center">
                <FormGroup>
                  <Label className="form-login-title">
                    Please do not forget your password again. Recheck your
                    password by logging in again.
                  </Label>
                </FormGroup>
                <a href={LOGIN_PAGE} className="w-100 link-no-underline">
                  <Button color="primary" block size="sm">
                    Return to sign in
                  </Button>
                </a>
              </div>
            )}
            {!(this.state.successAlert || this.state.invalidUid) && (
              <Form
                className="login-form-m align-center"
                onSubmit={this.onSubmit}
              >
                <FormGroup>
                  <Label for="new_password" className="form-login-title">
                    Password
                  </Label>
                  <Input
                    className="input-width"
                    type="password"
                    name="new_password"
                    id="new_password"
                    value={this.state.new_password}
                    onChange={this.handleInput}
                    required
                    bsSize="sm"
                    placeholder="Enter new password"
                    autoComplete="new-password"
                  />
                </FormGroup>
                <FormGroup>
                  <Label
                    for="confirm_new_password"
                    className="form-login-title"
                  >
                    Confirm password
                  </Label>
                  <Input
                    className="input-width"
                    type="password"
                    name="confirm_new_password"
                    id="confirm_new_password"
                    value={this.state.confirm_new_password}
                    onChange={this.handleInput}
                    required
                    bsSize="sm"
                    placeholder="Re-enter new password"
                    invalid={this.state.newPasswordInvalid}
                    valid={this.state.newPasswordValid}
                    autoComplete="new-password"
                  />
                  <FormFeedback valid>Sweet! Valid New Password</FormFeedback>
                  <FormFeedback>
                    New password field and confirm field is not match !
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <ReCaptchaWidget
                    setNeedVerifyRobot={this.setNeedVerifyRobot}
                    needVerifyRobot={this.state.needVerifyRobot}
                  />
                </FormGroup>
                <Button
                  color="success"
                  block
                  size="sm"
                  disabled={
                    this.state.new_password === '' ||
                    this.state.confirm_new_password !==
                      this.state.new_password ||
                    this.state.needVerifyRobot
                  }
                >
                  Change password
                </Button>
              </Form>
            )}

            <div className="login-callout mt-3">
              If there is any problem ? Contact our{' '}
              <a href={`${HOME_PAGE}#Contact-Us`}>admin</a>.
            </div>
          </LoadingSpinner>
        </div>
      </Fragment>
    );
  }
}
