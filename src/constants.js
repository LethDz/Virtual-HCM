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

// API Admin Route Path
export const ADMIN_GET_USER_ALL = "/user/all";
export const ADMIN_GET_USER = "/user/get";
export const ADMIN_EDIT_USER = "/user/edit";
export const ADMIN_CHANGE_STATUS_USER = "/user/change-status";

// API status code:
export const FORBIDDEN = 403;

// API error message:
export const ACCESS_TOKEN_EXPIRED = "Access token expired";
export const USER_IS_INACTIVE = "User is inactive";
export const USER_NOT_FOUND = "User not found";
export const WRONG_PASSWORD = "Wrong password";

// Home Page
export const HOME_PAGE = "/";

// Login Page
export const LOGIN_PAGE = "/login";

// Admin Page
export const ADMIN_PAGE = "/admin";
export const ADMIN_CONTRIBUTOR_LIST_PAGE = `${ADMIN_PAGE}/account`;
export const ADMIN_CONTRIBUTOR_CREATE_PAGE = `${ADMIN_CONTRIBUTOR_LIST_PAGE}/create`;
export const ADMIN_CONTRIBUTOR_EDIT_PAGE = `${ADMIN_CONTRIBUTOR_LIST_PAGE}/edit`;

// Contributor Page
export const CONTRIBUTOR_PAGE = "/contributor";
export const CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL = `${CONTRIBUTOR_PAGE}/data-approval`;
export const CONTRIBUTOR_PAGE_CREATE_DATA_APPROVAL_FORM = `${CONTRIBUTOR_PAGE_LIST_DATA_APPROVAL}/create`;

// Roles
export const ROLE_ADMIN = "Admin";
export const ROLE_CONTRIBUTOR = "Contributor";

// Cookie Name
export const CSRF_TOKEN = "csrftoken";
