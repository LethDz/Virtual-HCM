import React, { Fragment } from 'react';
import {
  checkRoleToRedirect,
  getUserData,
} from 'src/common/authorizationChecking';
import SignInForm from 'src/modules/login/components/SignInForm';
import 'src/static/stylesheets/login.css';
import { useToasts } from 'react-toast-notifications';
import { ADMIN_PAGE, CONTRIBUTOR_PAGE } from 'src/constants';
import { history } from 'src/common/history';

const Login = () => {
  const { addToast } = useToasts();
  if (checkRoleToRedirect()) {
    const authData = getUserData();
    authData.admin ? history.push(ADMIN_PAGE) : history.push(CONTRIBUTOR_PAGE);
    return <Fragment></Fragment>;
  }

  return (
    <div className="login-body align-center">
      <SignInForm addToast={addToast} />
    </div>
  );
};

export default Login;
