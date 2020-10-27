import React from 'react';
import { Route } from 'react-router-dom';
import ErrorBoundary from 'src/common/ErrorBoundary';

const ErrorBoundaryRoute = ({ component: Component, ...rest }) => {
  const encloseInErrorBoundary = (props) => {
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

export default ErrorBoundaryRoute;
