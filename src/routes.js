import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage, LoginPage } from 'src/pages/index';
import { HOME_PAGE, LOGIN_PAGE } from 'src/constants';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path={HOME_PAGE} component={HomePage} />
      <Route path={LOGIN_PAGE} component={LoginPage}/>
    </Switch>
  </Fragment>
);

export default Routes;
