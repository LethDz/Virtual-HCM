import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage, AdminPage, ContributorPage } from 'src/pages/index';
import { HOME_PAGE, LOGIN_PAGE, ADMIN_PAGE, CONTRIBUTOR_PAGE } from 'src/constants';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path={HOME_PAGE} component={HomePage} />
      <Route exact path={LOGIN_PAGE} component={LoginPage} />
      <Route exact path={ADMIN_PAGE} component={AdminPage} />
      <Route exact path={CONTRIBUTOR_PAGE} component={ContributorPage} />
    </Switch>
  </Fragment>
);

export default Routes;
