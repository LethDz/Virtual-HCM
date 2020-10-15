import React, { Component } from 'react';
import { Form, Input, Button } from 'reactstrap';
import lockIcon from 'src/static/icons/lockIcon';

class SignInForm extends Component {
  helloFromTheOthersSide = () => {
    throw new Error('Lỗi con mẹ mày rồi rồi địt con mẹ mày ngu');
  };

  render() {
    return (
      <div className="login-form-background">
        <Form className="login-form-m align-center">
          <h5 className="login-form-title">Hồ Chí Minh Virtual Chatbot</h5>
          <div className="icon-lock align-center">{lockIcon}</div>
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
          <Button color="primary" block onClick={this.helloFromTheOthersSide}>
            Sign in
          </Button>
        </Form>
      </div>
    );
  }
}

export default SignInForm;
