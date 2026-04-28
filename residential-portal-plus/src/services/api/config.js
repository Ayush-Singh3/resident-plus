const API_BASE_STORAGE_KEY = 'resident-plus-api-base';
const DEFAULT_API_BASE = '/mock';

export function getApiBase() {
  return localStorage.getItem(API_BASE_STORAGE_KEY) || DEFAULT_API_BASE;
}

export function setApiBase(value) {
  const normalizedValue = value?.trim() || DEFAULT_API_BASE;
  localStorage.setItem(API_BASE_STORAGE_KEY, normalizedValue);
  return normalizedValue;
}

export { API_BASE_STORAGE_KEY, DEFAULT_API_BASE };
