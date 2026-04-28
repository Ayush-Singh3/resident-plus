const listeners = {
  loading: new Set(),
  error: new Set(),
};

let activeRequestCount = 0;
let currentError = null;

function emit(type, value) {
  listeners[type].forEach((listener) => listener(value));
}

export function beginRequest() {
  activeRequestCount += 1;
  emit('loading', activeRequestCount);
}

export function endRequest() {
  activeRequestCount = Math.max(0, activeRequestCount - 1);
  emit('loading', activeRequestCount);
}

export function getLoadingCount() {
  return activeRequestCount;
}

export function subscribeToLoading(listener) {
  listeners.loading.add(listener);
  return () => listeners.loading.delete(listener);
}

export function setGlobalError(error) {
  currentError = error;
  emit('error', currentError);
}

export function clearGlobalError() {
  currentError = null;
  emit('error', currentError);
}

export function getGlobalError() {
  return currentError;
}

export function subscribeToError(listener) {
  listeners.error.add(listener);
  return () => listeners.error.delete(listener);
}
