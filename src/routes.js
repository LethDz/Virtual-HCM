import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  AdminPage,
  ContributorsListPage,
  ContributorCreatePage,
  ContributorEditPage, ContributorPage,
  CreateDataApprovalFormPage,
  DataApprovalListPage
} from 'src/pages/index';
import {
  HOME_PAGE,
  LOGIN_PAGE,
  ADMIN_PAGE,
  ADMIN_CONTRIBUTOR_LIST_PAGE,
  ADMIN_CONTRIBUTOR_CREATE_PAGE,
  ADMIN_CONTRIBUTOR_EDIT_PAGE, CONTRIBUTOR_PAGE,
  CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM,
  CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL
} from 'src/constants';
import ErrorBoundaryRoute from 'src/common/ErrorBoundaryRoute';
import PrivateRouteAdmin from 'src/common/PrivateRouteAdmin';
import PrivateRouteContributor from "src/common/PrivateRouteContributor";

const Routes = () => (
  <Fragment>
    <Switch>
      <ErrorBoundaryRoute exact path={HOME_PAGE} component={HomePage} />
      <ErrorBoundaryRoute exact path={LOGIN_PAGE} component={LoginPage} />
      <PrivateRouteAdmin exact path={ADMIN_PAGE} component={AdminPage} />
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
      <PrivateRouteAdmin
        exact
        path={ADMIN_CONTRIBUTOR_EDIT_PAGE()}
        component={ContributorEditPage}
      />
      <PrivateRouteContributor
        exact
        path={CONTRIBUTOR_PAGE}
        component={ContributorPage}
      />
      <PrivateRouteContributor
        exact
        path={CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM}
        component={CreateDataApprovalFormPage}
      />
      <PrivateRouteContributor
        exact
        path={CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL}
        component={DataApprovalListPage} />
    </Switch>
  </Fragment>
);

export default Routes;
