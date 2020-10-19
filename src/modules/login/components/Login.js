import React from 'react';
import { checkRoleToRedirect } from 'src/common/authorizationChecking';
import SignInForm from 'src/modules/login/components/SignInForm';
import 'src/static/stylesheets/login.css';

const Login = () => {
  checkRoleToRedirect();
  return (
    <div className="login-body align-center">
      <SignInForm />
    </div>
  );
};

export default Login;
