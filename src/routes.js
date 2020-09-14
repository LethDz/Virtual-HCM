import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from 'src/pages/index';
import { HOME_PAGE } from 'src/constants';

const Routes = () => (
  <Fragment>
    <Switch>
      <Route path={HOME_PAGE} component={HomePage} />
    </Switch>
  </Fragment>
);

export default Routes;
