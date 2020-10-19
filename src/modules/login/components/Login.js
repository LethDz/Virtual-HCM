import React, { Component } from "react";
import SignInForm from "src/modules/login/components/SignInForm";
import "src/static/stylesheets/login.css";

class Login extends Component {
  render() {
    return (
      <div className="login-body align-center">
        <SignInForm />
      </div>
    );
  }
}

export default Login;
