import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage, AdminPage } from 'src/pages/index';
import { HOME_PAGE, LOGIN_PAGE, ADMIN_PAGE } from 'src/constants';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path={HOME_PAGE} component={HomePage} />
      <Route exact path={LOGIN_PAGE} component={LoginPage}/>
      <Route exact path={ADMIN_PAGE} component={AdminPage}/>
    </Switch>
  </Fragment>
);

export default Routes;
