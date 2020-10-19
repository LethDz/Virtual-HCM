import React, { Component } from 'react';
import { Form, Input, Button, FormGroup, FormFeedback } from 'reactstrap';
import axiosClient from 'src/common/axiosClient';
import { handleInputChange } from 'src/common/handleInputChange';
import { history } from 'src/common/history';
import { ADMIN_PAGE, LOGIN } from 'src/constants';
import lockIcon from 'src/static/icons/lockIcon';
import { USER_NOT_FOUND, WRONG_PASSWORD } from 'src/modules/login';

class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      passwordInvalid: false,
      usernameInvalid: false,
    };
  }

  login = () => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };

    axiosClient
      .post(LOGIN, data)
      .then((response) => {
        const user = response.data.result_data;
        sessionStorage.setItem('user', JSON.stringify(user));
        history.push(ADMIN_PAGE);
      })
      .catch((error) => {
        if (error.response) {
          const resultData = error.response.data.result_data;
          if (
            resultData.error_detail &&
            resultData.error_detail === USER_NOT_FOUND
          ) {
            this.setState({
              usernameInvalid: true,
            });
          }

          if (
            resultData.error_detail &&
            resultData.error_detail === WRONG_PASSWORD
          ) {
            this.setState({
              passwordInvalid: true,
            });
          }
        }
      });
  };

  handleInput = (event) => {
    handleInputChange(event, this);
  };

  render() {
    return (
      <div className="login-form-background">
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
      </div>
    );
  }
}

export default SignInForm;
