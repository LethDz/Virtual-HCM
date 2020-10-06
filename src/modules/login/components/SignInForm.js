import React, { Component } from "react";
import { Form, Input, Button } from "reactstrap";

class SignInForm extends Component {
  render() {
    return (
      <div className="login-form-background">
        <Form className="login-form-m align-center">
          <h5 className="login-form-title">Hồ Chí Minh Virtual Chatbot</h5>
          <div className="icon-lock align-center">
            <svg
              class="MuiSvgIcon-root lock-image"
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
            </svg>
          </div>

          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
          />
          <br />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
          <br />
          <Button color="primary" block>
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignInForm;
