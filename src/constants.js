// Axios Config
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_DEPLOY
    : process.env.REACT_APP_API_URL_DEV;
export const API_PREFIX = '/api';

// API Common Route Path
export const LOGIN = '/auth';
export const LOGOUT = '/logout';

// API Admin Route Path
export const ADMIN_GET_USER_ALL = '/user/all';
export const ADMIN_GET_USER = '/user/get';
export const ADMIN_EDIT_USER = '/user/edit';
export const ADMIN_CHANGE_STATUS_USER = '/user/change-status';

// API status code:
export const FORBIDDEN = 403;

// API error message:
export const ACCESS_TOKEN_EXPIRED = 'Access token expired';
export const USER_IS_INACTIVE = 'User is inactive';
export const USER_NOT_FOUND = 'User not found';
export const WRONG_PASSWORD = 'Wrong password';

// Home Page
export const HOME_PAGE = '/';

// Login Page
export const LOGIN_PAGE = '/login';

// Admin Page
export const ADMIN_PAGE = '/admin';
export const ADMIN_CONTRIBUTOR_LIST_PAGE = `${ADMIN_PAGE}/account`;
export const ADMIN_CONTRIBUTOR_CREATE_PAGE = `${ADMIN_CONTRIBUTOR_LIST_PAGE}/create`;
export const ADMIN_CONTRIBUTOR_EDIT_PAGE = `${ADMIN_CONTRIBUTOR_LIST_PAGE}/edit`;

// Contributor Page
export const CONTRIBUTOR_PAGE = '/contributor';

//Reference Document Page
export const DOCUMENT_REFERENCE_PAGE = '/reference-document';
export const DOCUMENT_REFERENCE_LIST_PAGE = `${DOCUMENT_REFERENCE_PAGE}/all`;
export const DOCUMENT_REFERENCE_CREATE_PAGE = `${DOCUMENT_REFERENCE_PAGE}/add`;
export const DOCUMENT_REFERENCE_EDIT_PAGE = `${DOCUMENT_REFERENCE_PAGE}/edit`;
export const DOCUMENT_REFERENCE_SELECTED_PAGE = `${DOCUMENT_REFERENCE_PAGE}/edit`;

// Roles
export const ROLE_ADMIN = 'Admin';
export const ROLE_CONTRIBUTOR = 'Contributor';

// Cookie Name
export const CSRF_TOKEN = 'csrftoken';