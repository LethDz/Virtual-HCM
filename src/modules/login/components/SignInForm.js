import React, { Component, Fragment } from 'react';
import {
  Form,
  Input,
  Button,
  FormGroup,
  FormFeedback,
  Label,
} from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import { history } from 'src/common/history';
import { ADMIN_PAGE, CONTRIBUTOR_PAGE, LOGIN } from 'src/constants';
import { showLoginError } from 'src/modules/login';
import LoadingSpinner from 'src/common/loadingSpinner/LoadingSpinner';

class SignInForm extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordInvalid: false,
      usernameInvalid: false,
      loading: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  login = (event) => {
    event.preventDefault();

    this._isMounted &&
      this.setState({
        loading: true,
        passwordInvalid: false,
        usernameInvalid: false,
      });

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axiosClient
      .post(LOGIN, data)
      .then((response) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        const user = response.data.result_data.user;
        localStorage.setItem('user', JSON.stringify(user));
        const pageToRedirect = user.admin ? ADMIN_PAGE : CONTRIBUTOR_PAGE;
        history.push(pageToRedirect);
      })
      .catch((error) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        error && error.response
          ? showLoginError(error.response.data, this, this.props.addToast)
          : this.showException();
      });
  };

  showException = () => {
    this.props.addToast(
      'There is something wrong with the server! Please contact admin for supporting.',
      {
        appearance: 'error',
      }
    );
  };

  handleInput = (event) => {
    this._isMounted && handleInputChange(event, this);
  };

  render() {
    return (
      <Fragment>
        <div className="icon-bot"></div>
        <h1 className="login-form-title">
          Sign in to Hồ Chí Minh Virtual Chatbot
        </h1>
        <div>
          <LoadingSpinner loading={this.state.loading} text="Signing In">
            <Form className="login-form-m align-center" onSubmit={this.login}>
              <FormGroup>
                <Label for="password" className="form-login-title">
                  Username
                </Label>
                <Input
                  className="input-width"
                  type="text"
                  name="username"
                  id="username"
                  value={this.state.username}
                  onChange={this.handleInput}
                  required
                  invalid={this.state.usernameInvalid}
                  size="sm"
                  block
                />
                <FormFeedback>Invalid Username</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password" className="form-login-title">
                  Password
                </Label>
                <Input
                  className="input-width"
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  required
                  invalid={this.state.passwordInvalid}
                  size="sm"
                  block
                />
                <FormFeedback>Invalid Password</FormFeedback>
              </FormGroup>
              <Button color="success" block size="sm">
                Sign in
              </Button>
            </Form>
            <div className="login-callout mt-3">
              New to Hồ Chí Minh Virtual chatbot? Contact our <a href="#admin">admin</a>.
            </div>
          </LoadingSpinner>
        </div>
      </Fragment>
    );
  }
}

export default SignInForm;
