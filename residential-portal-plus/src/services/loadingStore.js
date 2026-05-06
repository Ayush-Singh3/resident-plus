let activeRequests = 0;
const listeners = new Set();

function notify() {
  const snapshot = { activeRequests, isLoading: activeRequests > 0 };
  listeners.forEach((listener) => listener(snapshot));
}

export function beginRequest() {
  activeRequests += 1;
  notify();
}

export function endRequest() {
  activeRequests = Math.max(0, activeRequests - 1);
  notify();
}

export function subscribeToLoading(listener) {
  listeners.add(listener);
  listener({ activeRequests, isLoading: activeRequests > 0 });

  return () => {
    listeners.delete(listener);
  };
}

export function getLoadingSnapshot() {
  return { activeRequests, isLoading: activeRequests > 0 };
}
