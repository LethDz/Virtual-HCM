// Axios Config
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_DEPLOY
    : process.env.REACT_APP_API_URL_DEV;
export const API_PREFIX = '/api';

// API Route Path
export const LOGIN = '/auth';
export const REFRESH_TOKEN = '/refresh-token';

// API status code:
export const FORBIDDEN = 403;

// API error message:
export const ACCESS_TOKEN_EXPIRED = 'Access token expired';
export const EXPIRED_REFRESH_TOKEN = 'Expired refresh token';
export const USER_IS_INACTIVE = 'User is inactive';
export const USER_NOT_FOUND = 'User not found';
export const WRONG_PASSWORD = 'Wrong password';

// Home Page
export const HOME_PAGE = '/';

// Login Page
export const LOGIN_PAGE = '/login';

// Admin Page
export const ADMIN_PAGE = '/admin';

// Contributor Page
export const CONTRIBUTOR_PAGE = '/contributor';

// Roles
export const ROLE_ADMIN = 'Admin';
export const ROLE_CONTRIBUTOR = 'Contributor';
