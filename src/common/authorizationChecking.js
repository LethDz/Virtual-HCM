import { history } from 'src/common/history';
import {
  ACCESS_TOKEN_EXPIRED,
  ADMIN_PAGE,
  CONTRIBUTOR_PAGE,
  FORBIDDEN,
  LOGIN_PAGE,
  LOGOUT,
  ROLE_ADMIN,
  ROLE_CONTRIBUTOR,
  USER_IS_INACTIVE,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import { store } from 'src/common/configStore';

export const checkRoleToRedirect = () => {
  const authData = getUserData();

  if (!authData) {
    return null;
  }

  authData.admin ? history.push(ADMIN_PAGE) : history.push(CONTRIBUTOR_PAGE);

  return authData.admin ? ROLE_ADMIN : ROLE_CONTRIBUTOR;
};

export const getTheCurrentUserRole = () => {
  const authData = getUserData();

  if (!authData) {
    return null;
  }

  return authData.admin ? ROLE_ADMIN : ROLE_CONTRIBUTOR;
};

export const getUserData = () => {
  return !sessionStorage.getItem('user')
    ? null
    : JSON.parse(sessionStorage.getItem('user'));
};

export const signOut = () => {
  sessionStorage.removeItem('user');
  axiosClient.get(LOGOUT);
  store.dispatch(resetAllRedux());
  history.push(LOGIN_PAGE);
};

// get cookie by name
export const getCookie = (cname) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, cname.length + 1) === cname + '=') {
        cookieValue = decodeURIComponent(cookie.substring(cname.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// if error occurs with 403 status code
// check the code if message returns authorization error message sign out the user
export const denyAuthorization = (error) => {
  const data = error.response.data;
  if (data && !data.status) {
    const resultData = data.result_data;
    if (
      resultData.error_detail &&
      checkMessageIsNotValidUser(resultData) &&
      window.location.pathname !== LOGIN_PAGE
    ) {
      signOut();
    }
  }
};

export const resetAllRedux = () => ({
  type: LOGOUT,
});

export const checkMessageIsNotValidUser = (resultData) =>
  resultData.status_code === FORBIDDEN &&
  (resultData.error_detail === USER_NOT_FOUND ||
    resultData.error_detail === USER_IS_INACTIVE ||
    resultData.error_detail === ACCESS_TOKEN_EXPIRED ||
    resultData.error_detail === WRONG_PASSWORD);
