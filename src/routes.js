import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import { HomePage, LoginPage, AdminPage } from 'src/pages/index';
import { HOME_PAGE, LOGIN_PAGE, ADMIN_PAGE } from 'src/constants';
import ErrorBoundaryRoute from 'src/common/ErrorBoundaryRoute';
import PrivateRouteAdmin from 'src/common/PrivateRouteAdmin';

const Routes = () => (
  <Fragment>
    <Switch>
      <ErrorBoundaryRoute exact path={HOME_PAGE} component={HomePage} />
      <ErrorBoundaryRoute exact path={LOGIN_PAGE} component={LoginPage} />
      <PrivateRouteAdmin exact path={ADMIN_PAGE} component={AdminPage} />
    </Switch>
  </Fragment>
);

export default Routes;
