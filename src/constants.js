// Axios Config
export const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL_DEPLOY
    : process.env.REACT_APP_API_URL_DEV;
export const API_PREFIX = "/api";

// API Common Route Path
export const LOGIN = "/auth";
export const LOGOUT = "/logout";

export const KNOWLEDGE_DATA = "/knowledge-data";
export const NLP = "/nlp";
export const TOKENIZE = "/tokenize";

export const SYNONYM = "/synonym";
export const REFERENCE = "/reference-document";

export const ADD = "/add";

export const ALL = "/all";

export const EDIT = "/edit";

export const DELETE = "/delete";

// API Admin Route Path
export const ADMIN_GET_USER_ALL = '/user/all';
export const ADMIN_GET_USER = (id) => (`/user/get?id=${id}`);
export const ADMIN_ADD_USER = '/user/add';
export const ADMIN_EDIT_USER = '/user/edit';
export const ADMIN_CHANGE_STATUS_USER = (id) => `/user/change-status?id=${id}`;

// API status code:
export const FORBIDDEN = 403;

// API error message:
export const ACCESS_TOKEN_EXPIRED = 'Access token expired';
export const USER_IS_INACTIVE = 'User is inactive';
export const USER_NOT_FOUND = 'User not found';
export const WRONG_PASSWORD = 'Wrong password';
export const BOTH_USERNAME_AND_PASSWORD_REQUIRED =
  'Both username and password required';

// Home Page
export const HOME_PAGE = "/";

// Login Page
export const LOGIN_PAGE = "/login";

// Admin Page
export const ADMIN_PAGE = "/admin";
export const ADMIN_CONTRIBUTOR_LIST_PAGE = `${ADMIN_PAGE}/account`;
export const ADMIN_CONTRIBUTOR_CREATE_PAGE = `${ADMIN_CONTRIBUTOR_LIST_PAGE}/create`;
export const ADMIN_CONTRIBUTOR_EDIT_PAGE = (id) =>
  id
    ? `${ADMIN_CONTRIBUTOR_LIST_PAGE}/edit/${id}`
    : `${ADMIN_CONTRIBUTOR_LIST_PAGE}/edit/:id`;

// Contributor Page
export const CONTRIBUTOR_PAGE = "/contributor";
export const CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL = `${CONTRIBUTOR_PAGE}/data-approval`;
export const CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM = `${CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL}/create`;

// Roles
export const ROLE_ADMIN = "Admin";
export const ROLE_CONTRIBUTOR = "Contributor";

// Cookie Name
export const CSRF_TOKEN = 'csrftoken';

// Base 64 Image generate
export const imgBase64 = (image) => `data:image/png;base64,${image}`;