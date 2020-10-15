import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundary from 'src/common/ErrorBoundary';
import { setAuthToken } from 'src/common/axiosClient';

const ErrorBoundaryRoute = ({ component: Component, ...rest }) => {
  const encloseInErrorBoundary = (props) => {
    setToken();
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  if (!Component) {
    throw new Error(`A component needs to be specified for path ${rest.path}`);
  }

  return <Route {...rest} render={encloseInErrorBoundary} />;
};

export const setToken = () => {
  const user = sessionStorage.getItem('user');
  user && user.token && setAuthToken(user.token);
  return user;
};

export default ErrorBoundaryRoute;
