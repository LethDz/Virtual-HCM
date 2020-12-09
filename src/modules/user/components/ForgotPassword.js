import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import ErrorAlert from 'src/common/alertComponent/ErrorAlert';
import SuccessAlert from 'src/common/alertComponent/SuccessAlert';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';
import ReCaptchaWidget from 'src/common/ReCaptchaWidget';
import {
  HOME_PAGE,
  LOGIN_PAGE,
  USER_REQUEST_CHANGE_PASSWORD,
} from 'src/constants';

export default class ForgotPassword extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      loading: false,
      errorList: [],
      errorAlert: false,
      successAlert: false,
      email: '',
      needVerifyRobot: true,
      emailSent: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleInput = async (event) => {
    await handleInputChange(event, this);
    !this.state.needVerifyRobot && this.setNeedVerifyRobot(true);
  };

  onSubmit = (event) => {
    event.preventDefault();
    if (this.state.email === '' && !this.state.needVerifyRobot) {
      return;
    }

    this.setErrorAlert(false);
    this.setErrorList([]);
    this.setSuccessAlert(false);
    this.setLoading(true);

    const data = {
      email: this.state.email,
    };

    axiosClient
      .post(USER_REQUEST_CHANGE_PASSWORD, data)
      .then((response) => {
        if (response?.data?.status) {
          this.setSuccessAlert(true);
          this.setEmailSent(true);
          this._isMounted &&
            this.setState({
              email: '',
            });
        } else {
          this.setErrorAlert(true);
          this.setErrorList(response?.data?.messages);
        }
        this.setNeedVerifyRobot(true);
        this.setLoading(false);
      })
      .catch(() => {
        this.setNeedVerifyRobot(true);
        this.setLoading(false);
        this.setErrorAlert(true);
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

  setNeedVerifyRobot = (status) => {
    this._isMounted &&
      this.setState({
        needVerifyRobot: status,
      });
  };

  setEmailSent = (status) => {
    this._isMounted &&
      this.setState({
        emailSent: status,
      });
  };

  render() {
    return (
      <Fragment>
        <div className="icon-bot"></div>
        <h1 className="login-form-title">Reset your password</h1>
        {this.state.successAlert && (
          <SuccessAlert
            successAlert={this.state.successAlert}
            text="We sent password reset email to you. Please check your email. (May be our email is in spam folder)"
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
        <div>
          <LoadingSpinner loading={this.state.loading} text="Loading">
            {this.state.emailSent && (
              <div className="login-form-m align-center">
                <a href={LOGIN_PAGE} className="w-100 link-no-underline">
                  <Button color="primary" block size="sm">
                    Return to sign in
                  </Button>
                </a>
              </div>
            )}
            {!this.state.emailSent && (
              <Form
                className="login-form-m align-center"
                onSubmit={this.onSubmit}
              >
                <FormGroup>
                  <Label className="font-weight-600">
                    Enter your user account's verified email address and we will
                    send you a password reset link.
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    className="input-width"
                    type="email"
                    name="email"
                    id="email"
                    value={this.state.email}
                    onChange={this.handleInput}
                    required
                    bsSize="sm"
                    placeholder="Enter your email address"
                  />
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
                    this.state.email === '' || this.state.needVerifyRobot
                  }
                >
                  Send password reset email
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
