import axios from 'axios';

export function normalizeApiError(error) {
  if (axios.isCancel(error) || error?.code === 'ERR_CANCELED') {
    return {
      type: 'cancelled',
      title: 'Request cancelled',
      message: 'The request was cancelled before it could finish.',
      retryable: true,
      status: null
    };
  }

  if (error?.code === 'ECONNABORTED') {
    return {
      type: 'timeout',
      title: 'Request timed out',
      message: 'The request took too long. Please check your connection and try again.',
      retryable: true,
      status: null
    };
  }

  const status = error?.response?.status ?? null;

  if (status === 401) {
    return {
      type: 'auth',
      title: 'Session expired',
      message: 'Your session has expired. Please log in again.',
      retryable: false,
      status
    };
  }

  if (status === 404) {
    return {
      type: 'not_found',
      title: 'Information unavailable',
      message: 'The requested information could not be found. Please refresh and try again.',
      retryable: true,
      status
    };
  }

  if (status >= 500) {
    return {
      type: 'server',
      title: 'Server unavailable',
      message: 'The server is currently unavailable. Please try again shortly.',
      retryable: true,
      status
    };
  }

  if (error?.message === 'Network Error' || !error?.response) {
    return {
      type: 'network',
      title: 'Connection problem',
      message: 'We could not reach the server. Please check your connection and try again.',
      retryable: true,
      status: null
    };
  }

  return {
    type: 'unknown',
    title: 'Something went wrong',
    message: 'Something went wrong while processing your request. Please try again.',
    retryable: true,
    status
  };
}
