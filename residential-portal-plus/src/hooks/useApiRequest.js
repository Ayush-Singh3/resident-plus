import { useCallback, useEffect, useRef, useState } from 'react';

export default function useApiRequest(requestFn, options = {}) {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const requestRef = useRef(requestFn);
  const mountedRef = useRef(true);
  const controllerRef = useRef(null);

  requestRef.current = requestFn;

  const execute = useCallback(async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);
    setError(null);

    try {
      const result = await requestRef.current({ signal: controller.signal });
      if (mountedRef.current) {
        setData(result);
      }
      return result;
    } catch (requestError) {
      if (mountedRef.current && requestError?.shouldDisplay !== false) {
        setError(requestError);
      }
      throw requestError;
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (immediate) {
      execute().catch(() => {});
    } else {
      setIsLoading(false);
    }

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      mountedRef.current = false;
    };
  }, [execute, immediate]);

  return {
    data,
    error,
    isLoading,
    execute,
    setData,
    retry: execute,
  };
}
