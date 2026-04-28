import axios from 'axios';
import { getApiBase } from './config';
import {
  beginRequest,
  endRequest,
  setGlobalError,
} from './state';

export function getErrorMessage(error) {
  if (error.code === 'ERR_NETWORK') {
    return 'Network issue. Check your connection and try again.';
  }

  const status = error.response?.status;

  if (status === 401) {
    return 'Your session has expired. Sign in again to continue.';
  }

  if (status >= 500) {
    return 'The server is having trouble right now. Please try again shortly.';
  }

  return error.response?.data?.message || error.message || 'Something went wrong. Please try again.';
}

const apiClient = axios.create({
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    beginRequest();

    return {
      ...config,
      baseURL: getApiBase(),
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
    };
  },
  (error) => {
    endRequest();
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    endRequest();
    return response;
  },
  (error) => {
    endRequest();
    setGlobalError({
      message: getErrorMessage(error),
      status: error.response?.status || null,
      timestamp: Date.now(),
    });
    return Promise.reject(error);
  }
);

export default apiClient;
