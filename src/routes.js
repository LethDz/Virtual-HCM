import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import { HomePage, LoginPage, AdminPage, ContributorPage } from 'src/pages/index';
import { HOME_PAGE, LOGIN_PAGE, ADMIN_PAGE, CONTRIBUTOR_PAGE } from 'src/constants';
import ErrorBoundaryRoute from 'src/common/ErrorBoundaryRoute';
import PrivateRoute from 'src/common/PrivateRoute';

const Routes = () => (
  <Fragment>
    <Switch>
      <ErrorBoundaryRoute exact path={HOME_PAGE} component={HomePage} />
      <ErrorBoundaryRoute exact path={LOGIN_PAGE} component={LoginPage} />
      <PrivateRoute exact path={ADMIN_PAGE} component={AdminPage} />
      <PrivateRoute exact path={CONTRIBUTOR_PAGE} component={ContributorPage} />
    </Switch>
  </Fragment>
);

export default Routes;
