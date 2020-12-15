// Axios Config
export const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_DEPLOY
    : process.env.REACT_APP_API_URL_DEV;
export const API_PREFIX = '/api';

// Base 64 Image generate
export const imgBase64 = (image) => `${API_URL}${image}`;

// Web-socket URL:
export const WEB_SOCKET_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_WEB_SOCKET_DEPLOY
    : process.env.REACT_APP_WEB_SOCKET_DEV;
export const WEB_SOCKET_TRAINING = `${WEB_SOCKET_URL}/ws/train-classifier/`;
export const WEB_SOCKET_CHAT = `${WEB_SOCKET_URL}/ws/chat/`;

// API Common Route Path
export const LOGIN = '/auth';
export const LOGOUT = '/logout';
export const FIRST_LOGIN_CHANGE_PASSWORD = '/user/update-password-first-login';

export const KNOWLEDGE_DATA = '/knowledge-data';
export const KNOWLEDGE_DATA_ALL_TRAINABLE = `${KNOWLEDGE_DATA}/all-trainable`;
export const NLP = '/nlp';
export const TOKENIZE = '/tokenize';

export const SYNONYM = '/synonym';
export const GET_SYNONYM = (id) => `/get?id=${id}`;
export const DELETE_SYNONYM = (id) => `/delete?id=${id}`;

export const REFERENCE = '/reference-document';
export const CHAT_HISTORY = '/chat-history';
export const CHAT_HISTORY_DETAIL = (id) => `/chat-history/get?log_id=${id}`;
export const USER_EDIT_PROFILE = '/user/edit';

export const DASHBOARD = '/dashboard';
export const USER_CHANGE_PASSWORD = '/user/change-password';
export const USER_REQUEST_CHANGE_PASSWORD = '/user/request-reset-password';
export const USER_RESET_PASSWORD = '/user/reset-password';
export const USER_CHECK_RESET_PASSWORD_SESSION =
  '/user/check-reset-password-session';
export const KNOWLEDGE_DATA_CHANGE_STATUS = '/knowledge-data/change-status';

//report
export const GET_ALL_PENDING_REPORT = '/report/all-pending';
export const GET_ALL_ACCEPTED_REPORT = '/report/all-accepted';
export const GET_ALL_REJECTED_REPORT = '/report/all-rejected';
export const REJECT_REPORT = '/report/reject-report';
export const GET_PENDING_REPORT = (id) => `/report/get-pending?id=${id}`;
export const GET_ACCEPTED_REPORT = (id) => `/report/get-accepted?id=${id}`;
export const GET_REJECTED_REPORT = (id) => `/report/get-rejected?id=${id}`;
export const REPORT_TO_CONTRIBUTOR = 'report/report-to-contributor';

export const ADD = '/add';

export const GENERATE_SIMILARIES = '/generate-similaries';
export const ALL = '/all';
export const EDIT = '/edit';
export const REVIEW = '/review';
export const ALL_REVIEW = (id) => `/all-reviews?knowledge_data=${id}`;

export const EDIT_COMMENT = `/edit-comment`;
export const POST_COMMENT = '/post-comment';
export const GET_ALL_COMMENT = (id) => `/all-comment?knowledge_data=${id}`;
export const DELETE_COMMENT = (id) => `/delete-comment?id=${id}`;

export const DELETE_REFERENCE = (id) => `/delete?reference_document_id=${id}`;
export const GET_REFERENCE = (id) => `/get?reference_document_id=${id}`;

// API Admin Route Path
export const ADMIN_GET_USER_ALL = '/user/all';
export const ADMIN_GET_USER = (id) => `/user/get?id=${id}`;
export const ADMIN_ADD_USER = '/user/add';
export const ADMIN_EDIT_USER = '/user/admin-edit';
export const ADMIN_CHANGE_STATUS_USER = (id) => `/user/change-status?id=${id}`;
export const ADMIN_GET_ALL_TRAINABLE_DATA = `/train-data/all-trainable`;
export const ADMIN_GET_ALL_TRAIN_DATA = `/train-data/all`;
export const ADMIN_GET_ALL_DELETED_TRAIN_DATA = `/train-data/all-deleted`;
export const ADMIN_DOWNLOAD_TRAIN_DATA = (id) =>
  `/train-data/download?id=${id}`;
export const ADMIN_TOGGLE_STATUS_TRAIN_DATA = (id) =>
  `/train-data/toggle?id=${id}`;
export const ADMIN_DELETE_TRAIN_DATA = `/train-data/delete`;
export const ADMIN_CHANGE_DESCRIPTION_TRAIN_DATA = `/train-data/change-description`;
export const ADMIN_ADD_TRAIN_DATA = `/train-data/add`;
export const ADMIN_CHANGE_SETTING = `/setting/update`;
export const ADMIN_GET_ALL_SETTING = `/setting/all`;
export const ADMIN_GET_TRAIN_DATA = '/train-data/get';

// API status code:
export const FORBIDDEN = 403;

// API error message:
export const USER_HAS_BEEN_BANNED = 'User has been banned';
export const AUTHENTICATION_CREDENTIALS_WERE_NOT_PROVIDED =
  'Authentication credentials were not provided.';
export const ACCESS_TOKEN_EXPIRED = 'Access token expired';
export const USER_IS_INACTIVE = 'User is inactive';
export const USER_NOT_FOUND = 'User not found';
export const WRONG_PASSWORD = 'Wrong password';
export const BOTH_USERNAME_AND_PASSWORD_REQUIRED =
  'Both username and password required';

// Home Page
export const HOME_PAGE = '/';

// Login Page
export const LOGIN_PAGE = '/login';

// Common Page
export const USER_DETAIL_PAGE = (id) =>
  id
    ? `${CONTRIBUTOR_PAGE}/user-detail/${id}`
    : `${CONTRIBUTOR_PAGE}/user-detail/:id`;

export const FORGOT_PASSWORD_PAGE = '/forgot-password';
export const RESET_PASSWORD_PAGE = '/reset-password';

// Admin Page
export const ADMIN_PAGE = '/admin';
export const ADMIN_CONTRIBUTOR_LIST_PAGE = `${ADMIN_PAGE}/account`;
export const ADMIN_CONTRIBUTOR_CREATE_PAGE = `${ADMIN_CONTRIBUTOR_LIST_PAGE}/create`;
export const ADMIN_CONTRIBUTOR_EDIT_PAGE = (id) =>
  id
    ? `${ADMIN_CONTRIBUTOR_LIST_PAGE}/edit/${id}`
    : `${ADMIN_CONTRIBUTOR_LIST_PAGE}/edit/:id`;
export const ADMIN_MANAGE_TRAINING_PROCESS_PAGE = `${ADMIN_PAGE}/manage-training-process`;
export const ADMIN_CONFIGURE_SYSTEM_PAGE = `${ADMIN_PAGE}/configure-system`;
export const ADMIN_TRAIN_DATA_PAGE = `${ADMIN_PAGE}/train-data`;

// Contributor Page
export const CONTRIBUTOR_PAGE = '/contributor';
export const CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA = `${CONTRIBUTOR_PAGE}${KNOWLEDGE_DATA}`;
export const CONTRIBUTOR_PAGE_CREATE_KNOWLEDGE_DATA_FORM = `${CONTRIBUTOR_PAGE_LIST_KNOWLEDGE_DATA}/create`;
export const SYNONYM_LIST_PAGE = `${CONTRIBUTOR_PAGE}/synonyms`;
export const REFERENCE_LIST_PAGE = `${CONTRIBUTOR_PAGE}/references`;
export const CHAT_HISTORY_LIST_PAGE = `${CONTRIBUTOR_PAGE}/chat-history`;
export const REPORT_LIST_PAGE = `${CONTRIBUTOR_PAGE}/reports`;

export const GET_KNOWLEDGE_DATA_BY_INTENT = (intent) =>
  intent
    ? `${CONTRIBUTOR_PAGE}${KNOWLEDGE_DATA}/get/${intent}`
    : `${CONTRIBUTOR_PAGE}${KNOWLEDGE_DATA}/get/:intent`;

// API Contributor Route Path
export const GET_KNOWLEDGE_DATA_BY_INTENT_PARAMS = (intent) =>
  `${KNOWLEDGE_DATA}/get?intent=${intent}`;

// Roles
export const ROLE_ADMIN = 'Admin';
export const ROLE_CONTRIBUTOR = 'Contributor';

// Cookie Name
export const CSRF_TOKEN = 'csrftoken';

// General Error Message
export const generalError = 'An error has occured';
