import React from 'react';
import { checkRoleToRedirect } from 'src/common/authorizationChecking';
import SignInForm from 'src/modules/login/components/SignInForm';
import 'src/static/stylesheets/login.css';
import { useToasts } from 'react-toast-notifications';

const Login = () => {
  checkRoleToRedirect();
  const { addToast } = useToasts();
  return (
    <div className="login-body align-center">
      <SignInForm addToast={addToast} />
    </div>
  );
};

export default Login;
