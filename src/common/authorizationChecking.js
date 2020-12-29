import { history } from 'src/common/history';
import {
  ACCESS_TOKEN_EXPIRED,
  AUTHENTICATION_CREDENTIALS_WERE_NOT_PROVIDED,
  FORBIDDEN,
  LOGIN_PAGE,
  LOGOUT,
  ROLE_ADMIN,
  ROLE_CONTRIBUTOR,
  USER_HAS_BEEN_BANNED,
  USER_IS_INACTIVE,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from 'src/constants';
import axiosClient from 'src/common/axiosClient';
import { store } from 'src/common/configStore';

export const checkRoleToRedirect = () => {
  const authData = getUserData();

  if (!authData) {
    return false;
  }

  return true;
};

export const getTheCurrentUserRole = () => {
  const authData = getUserData();

  if (!authData) {
    return null;
  }

  return authData.admin ? ROLE_ADMIN : ROLE_CONTRIBUTOR;
};

export const getUserData = () => {
  try {
    const user = !localStorage.getItem('user')
      ? null
      : JSON.parse(localStorage.getItem('user'));

    return user;
  } catch (error) {
    return null;
  }
};

export const signOut = () => {
  localStorage.removeItem('user');
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
  const data = error.response && error.response.data;
  if (data && !data.status) {
    const resultData = data.result_data;
    if (
      resultData.error_detail &&
      checkMessageIsNotValidUser(resultData) &&
      window.location.pathname !== LOGIN_PAGE
    ) {
      localStorage.setItem('loginFlag', resultData.error_detail);
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
    resultData.error_detail === WRONG_PASSWORD ||
    resultData.error_detail === AUTHENTICATION_CREDENTIALS_WERE_NOT_PROVIDED ||
    resultData.error_detail === USER_HAS_BEEN_BANNED);
