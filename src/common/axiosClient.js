import { API_URL, API_PREFIX } from 'src/constants';
const axios = require('axios').default;

const token = null;
const axiosClient = axios.create({
  baseURL: API_URL + API_PREFIX,
  responseType: 'json',
  headers: {
    'content-type': 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token !== null) {
    axiosClient.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
};

setAuthToken(token);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
