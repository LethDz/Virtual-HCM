import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ErrorBoundary from 'src/common/ErrorBoundary';
import { LOGIN_PAGE } from 'src/constants';
import { setToken } from 'src/common/authorizationChecking';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const checkAuthorization = (props) => {
    const user = setToken();
    return user && user.access_token && user.user.admin ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
      <Redirect
        to={{
          pathname: LOGIN_PAGE,
          state: { from: props.location },
        }}
      />
    );
  };

  if (!Component) {
    throw new Error(
      `A component needs to be specified for private route for path ${rest.path}`
    );
  }

  return <Route {...rest} render={checkAuthorization} />;
};

export default PrivateRoute;
