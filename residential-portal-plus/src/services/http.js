import axios from 'axios';
import { beginRequest, endRequest } from './loadingStore';
import { normalizeApiError } from './errorUtils';

const API_ROOT = '/mock';
const REQUEST_TIMEOUT = 5000;
const AUTH_TOKEN_KEY = 'resident-plus-auth-token';

let onAuthExpired = null;

export function setAuthExpiredHandler(handler) {
  onAuthExpired = handler;
}

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
}

const http = axios.create({
  baseURL: API_ROOT,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  (config) => {
    beginRequest();

    const token = getAuthToken();
    config.headers = config.headers || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    endRequest();
    return Promise.reject(normalizeApiError(error));
  }
);

http.interceptors.response.use(
  (response) => {
    endRequest();
    return response;
  },
  (error) => {
    endRequest();

    const normalized = normalizeApiError(error);
    if (normalized.type === 'auth' && typeof onAuthExpired === 'function') {
      onAuthExpired(normalized);
    }

    return Promise.reject(normalized);
  }
);

export async function get(path, config = {}) {
  const response = await http.get(path, config);
  return response.data;
}

export async function post(path, body, config = {}) {
  const response = await http.post(path, body, config);
  return response.data;
}

export { API_ROOT, AUTH_TOKEN_KEY, REQUEST_TIMEOUT };
export default http;
