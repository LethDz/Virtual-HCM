import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import {
  HomePage,
  LoginPage,
  AdminPage,
  ContributorPage,
  ContributorsListPage,
  ContributorCreatePage,
  ContributorEditPage,
  CreateDataApprovalFormPage,
  DataApprovalListPage,
  ManageTrainingProcessPage,
  ConfigureSystemPage,
  ReferenceListPage,
  DataApprovalDetailPage,
} from 'src/pages';
import {
  HOME_PAGE,
  LOGIN_PAGE,
  ADMIN_PAGE,
  CONTRIBUTOR_PAGE,
  ADMIN_CONTRIBUTOR_LIST_PAGE,
  ADMIN_CONTRIBUTOR_CREATE_PAGE,
  ADMIN_CONTRIBUTOR_EDIT_PAGE,
  CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM,
  CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL,
  ADMIN_MANAGE_TRAINING_PROCESS_PAGE,
  ADMIN_CONFIGURE_SYSTEM_PAGE,
  REFERENCE_LIST_PAGE,
  GET_KNOWLEDGE_DATA_BY_INTENT,
} from 'src/constants';
import ErrorBoundaryRoute from 'src/common/ErrorBoundaryRoute';
import PrivateRouteAdmin from 'src/common/PrivateRouteAdmin';
import PrivateRouteContributor from 'src/common/PrivateRouteContributor';

const Routes = () => (
  <Fragment>
    <Switch>
      <ErrorBoundaryRoute exact path={HOME_PAGE} component={HomePage} />
      <ErrorBoundaryRoute exact path={LOGIN_PAGE} component={LoginPage} />
      <PrivateRouteAdmin exact path={ADMIN_PAGE} component={AdminPage} />
      <PrivateRouteContributor
        exact
        path={CONTRIBUTOR_PAGE}
        component={ContributorPage}
      />
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
      <PrivateRouteAdmin
        exact
        path={ADMIN_MANAGE_TRAINING_PROCESS_PAGE}
        component={ManageTrainingProcessPage}
      />
      <PrivateRouteAdmin
        exact
        path={ADMIN_CONFIGURE_SYSTEM_PAGE}
        component={ConfigureSystemPage}
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
        component={DataApprovalListPage}
      />
      <PrivateRouteContributor
        exact
        path={REFERENCE_LIST_PAGE}
        component={ReferenceListPage}
      />
      <PrivateRouteContributor
        exact
        path={GET_KNOWLEDGE_DATA_BY_INTENT()}
        component={DataApprovalDetailPage}
      />
    </Switch>
  </Fragment>
);

export default Routes;
