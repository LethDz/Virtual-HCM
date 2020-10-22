import React, { Component } from 'react';
import { Form, Input, Button, FormGroup, FormFeedback } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import { history } from 'src/common/history';
import { ADMIN_PAGE, LOGIN } from 'src/constants';
import { showLoginError } from 'src/modules/login';
import lockIcon from 'src/static/icons/lockIcon';
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

  login = () => {
    this._isMounted &&
      this.setState({
        loading: true,
      });

    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axiosClient
      .post(LOGIN, data)
      .then((response) => {
        const user = response.data.result_data;
        sessionStorage.setItem('user', JSON.stringify(user));
      })
      .then(() => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        history.push(ADMIN_PAGE);
      })
      .catch((error) => {
        this._isMounted &&
          this.setState({
            loading: false,
          });
        error.response && showLoginError(error.response.data, this);
      });
  };

  handleInput = (event) => {
    this._isMounted && handleInputChange(event, this);
  };

  render() {
    return (
      <div className="login-form-background">
        <LoadingSpinner loading={this.state.loading} text="Signing In">
          <Form className="login-form-m align-center">
            <h5 className="login-form-title">Hồ Chí Minh Virtual Chatbot</h5>
            <div className="icon-lock align-center">{lockIcon}</div>
            <FormGroup className="w-100">
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInput}
                required
                invalid={this.state.usernameInvalid}
              />
              <FormFeedback>Invalid Username</FormFeedback>
            </FormGroup>
            <FormGroup className="w-100">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInput}
                required
                invalid={this.state.passwordInvalid}
              />
              <FormFeedback>Invalid Password</FormFeedback>
            </FormGroup>
            <Button color="primary" block onClick={this.login}>
              Sign in
            </Button>
          </Form>
        </LoadingSpinner>
      </div>
    );
  }
}

export default SignInForm;
