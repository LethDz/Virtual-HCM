import { history } from 'src/common/history';
import {
  ADMIN_PAGE,
  CONTRIBUTOR_PAGE,
  LOGIN_PAGE,
  ROLE_ADMIN,
  ROLE_CONTRIBUTOR,
} from 'src/constants';

export const checkRoleToRedirect = () => {
  const authData = getUserData();

  if (!authData) {
    return;
  }
  authData && authData.access_token
    ? authData.user.admin
      ? history.push(ADMIN_PAGE)
      : history.push(CONTRIBUTOR_PAGE)
    : history.push(LOGIN_PAGE);
  return authData ? (authData.user.admin ? ROLE_ADMIN : ROLE_CONTRIBUTOR) : '';
};

export const getTheCurrentUserRole = () => {
  const authData = getUserData();

  if (!authData) {
    return;
  }

  return authData ? (authData.user.admin ? ROLE_ADMIN : ROLE_CONTRIBUTOR) : '';
};

export const getUserData = () => {
  return !sessionStorage.getItem('user')
    ? null
    : JSON.parse(sessionStorage.getItem('user'));
};
