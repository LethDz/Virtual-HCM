import React, { Component } from "react";
import { connect } from "react-redux";
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

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
