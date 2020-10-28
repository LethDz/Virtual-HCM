import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  AdminPage,
  ContributorPage,
  ContributorsListPage,
  ContributorCreatePage,
} from 'src/pages/index';
import {
  HOME_PAGE,
  LOGIN_PAGE,
  ADMIN_PAGE,
  CONTRIBUTOR_PAGE,
  ADMIN_CONTRIBUTOR_LIST_PAGE,
  ADMIN_CONTRIBUTOR_CREATE_PAGE,
} from 'src/constants';
import ErrorBoundaryRoute from 'src/common/ErrorBoundaryRoute';
import PrivateRouteAdmin from 'src/common/PrivateRouteAdmin';
import PrivateRouteContributor from './common/PrivateRouteContributor';

const Routes = () => (
  <Fragment>
    <Switch>
      <ErrorBoundaryRoute exact path={HOME_PAGE} component={HomePage} />
      <ErrorBoundaryRoute exact path={LOGIN_PAGE} component={LoginPage} />
      <PrivateRouteAdmin exact path={ADMIN_PAGE} component={AdminPage} />
      <PrivateRouteContributor exact path={CONTRIBUTOR_PAGE} component={ContributorPage} />
      <PrivateRouteAdmin
        exact
        path={ADMIN_CONTRIBUTOR_LIST_PAGE}
        component={ContributorsListPage}
      />
      <PrivateRouteAdmin
        exact
        path={ADMIN_CONTRIBUTOR_CREATE_PAGE}
        component={ContributorCreatePage}
      />
    </Switch>
  </Fragment>
);

export default Routes;
