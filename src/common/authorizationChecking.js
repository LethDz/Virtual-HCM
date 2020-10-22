import { history } from 'src/common/history';
import {
  ACCESS_TOKEN_EXPIRED,
  ADMIN_PAGE,
  CONTRIBUTOR_PAGE,
  EXPIRED_REFRESH_TOKEN,
  FORBIDDEN,
  LOGIN_PAGE,
  REFRESH_TOKEN,
  ROLE_ADMIN,
  ROLE_CONTRIBUTOR,
  USER_IS_INACTIVE,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} from 'src/constants';
import axiosClient, { setAuthToken } from 'src/common/axiosClient';

export const checkRoleToRedirect = () => {
  const authData = getUserData();

  if (!authData) {
    return;
  }
  authData.user.admin
    ? history.push(ADMIN_PAGE)
    : history.push(CONTRIBUTOR_PAGE);
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

// Set AuthToken to axios header from session storage
export const setToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  user && user.access_token && setAuthToken(user.access_token);
  return user;
};

// Set new AuthToken after refreshed
export const setRefreshedToken = (newToken) => {
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (user && user.access_token) {
    setAuthToken(newToken);
    user.access_token = newToken;
    sessionStorage.setItem('user', JSON.stringify(user));
  }
};

export const signOut = () => {
  sessionStorage.removeItem('user');
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

// If the access_token is expired get new token and make the request again
export const getNewAccessToken = (error, callBack1, callBack2) => {
  const data = error.response.data;
  const config = error.response.config;
  if (data && !data.status) {
    const resultData = data.result_data;
    if (resultData.error_detail && checkMessageIsTokenExpired(resultData)) {
      axiosClient
        .post(REFRESH_TOKEN)
        .then((response) => {
          const accessToken = response.data
            ? response.data.result_data.access_token
            : null;
          if (accessToken) {
            setRefreshedToken(accessToken);
          }
        })
        .then(() => {
          if (config) {
            axiosClient(config)
              .then((response) => {
                callBack1(response);
              })
              .catch((error) => {
                callBack2(error);
              });
          }
        });
    }
  }
};

export const checkMessageIsTokenExpired = (resultData) =>
  resultData.status_code === FORBIDDEN &&
  resultData.error_detail === ACCESS_TOKEN_EXPIRED;

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

export const checkMessageIsNotValidUser = (resultData) =>
  resultData.status_code === FORBIDDEN &&
  (resultData.error_detail === USER_NOT_FOUND ||
    resultData.error_detail === USER_IS_INACTIVE ||
    resultData.error_detail === EXPIRED_REFRESH_TOKEN ||
    resultData.error_detail === WRONG_PASSWORD);
