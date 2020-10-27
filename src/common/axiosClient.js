import https from 'https';
import { API_URL, API_PREFIX } from 'src/constants';
import { denyAuthorization } from 'src/common/authorizationChecking';
const axios = require('axios').default;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosClient = axios.create({
  baseURL: API_URL + API_PREFIX,
  responseType: 'json',
  headers: {
    'content-type': 'application/json',
  },
  withCredentials: true,
  httpsAgent: agent,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    denyAuthorization(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
