import axios from 'axios';

const API_ROOT = '/mock';
const REQUEST_TIMEOUT = 5000;
const SETTINGS_STORAGE_KEY = 'resident-plus-settings';

let activeRequests = 0;
const listeners = new Set();

function notifyRequestListeners() {
  const count = Math.max(activeRequests, 0);
  listeners.forEach((listener) => listener(count));
}

export function subscribeToRequestState(listener) {
  listeners.add(listener);
  listener(activeRequests);

  return () => {
    listeners.delete(listener);
  };
}

function startRequest() {
  activeRequests += 1;
  notifyRequestListeners();
}

function finishRequest() {
  activeRequests = Math.max(activeRequests - 1, 0);
  notifyRequestListeners();
}

function getAuthToken() {
  return window.localStorage.getItem('resident-plus-auth-token');
}

function getApiBaseUrl() {
  const rawSettings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);

  if (!rawSettings) {
    return API_ROOT;
  }

  try {
    const settings = JSON.parse(rawSettings);
    return settings?.apiBase || API_ROOT;
  } catch (_error) {
    return API_ROOT;
  }
}

function normalizeApiError(error) {
  if (axios.isCancel(error) || error?.code === 'ERR_CANCELED') {
    return {
      code: 'REQUEST_CANCELED',
      message: 'This request was canceled.',
      shouldDisplay: false,
    };
  }

  if (error?.code === 'ECONNABORTED') {
    return {
      code: 'TIMEOUT',
      message: 'The request took too long. Please check your connection and try again.',
      shouldDisplay: true,
    };
  }

  const status = error?.response?.status;

  if (status === 401) {
    return {
      code: 'SESSION_EXPIRED',
      status,
      message: 'Your session has expired. Please log in again.',
      shouldDisplay: true,
    };
  }

  if (status === 403) {
    return {
      code: 'FORBIDDEN',
      status,
      message: 'You do not have permission to complete this action.',
      shouldDisplay: true,
    };
  }

  if (status === 404) {
    return {
      code: 'NOT_FOUND',
      status,
      message: 'The requested information could not be found.',
      shouldDisplay: true,
    };
  }

  if (status >= 500) {
    return {
      code: 'SERVER_UNAVAILABLE',
      status,
      message: 'The server is currently unavailable. Please try again shortly.',
      shouldDisplay: true,
    };
  }

  if (!error?.response) {
    return {
      code: 'NETWORK_ERROR',
      message: 'Unable to connect right now. Please check your connection and try again.',
      shouldDisplay: true,
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    status,
    message: 'Something went wrong while processing your request. Please try again.',
    shouldDisplay: true,
  };
}

const apiClient = axios.create({
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    startRequest();
    config.baseURL = getApiBaseUrl();

    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    finishRequest();
    return Promise.reject(normalizeApiError(error));
  }
);

apiClient.interceptors.response.use(
  (response) => {
    finishRequest();
    return response;
  },
  (error) => {
    finishRequest();
    return Promise.reject(normalizeApiError(error));
  }
);

async function request(config) {
  const response = await apiClient.request(config);
  return response.data;
}

const api = {
  get: (path, config = {}) => request({ url: path, method: 'get', ...config }),
  post: (path, body, config = {}) => request({ url: path, method: 'post', data: body, ...config }),
  createCancelToken: () => new AbortController(),
};

export { API_ROOT, REQUEST_TIMEOUT, normalizeApiError };
export default api;
