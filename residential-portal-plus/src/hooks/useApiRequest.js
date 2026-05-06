import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_STATE = {
  data: null,
  error: null,
  isLoading: false
};

export function useApiRequest(requestFn, options = {}) {
  const { immediate = true, initialData = null } = options;
  const mountedRef = useRef(true);
  const abortControllerRef = useRef(null);
  const [state, setState] = useState({ ...DEFAULT_STATE, data: initialData, isLoading: immediate });

  const execute = useCallback(
    async (...args) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setState((current) => ({ ...current, isLoading: true, error: null }));

      try {
        const data = await requestFn({ signal: controller.signal }, ...args);
        if (!mountedRef.current || controller.signal.aborted) {
          return null;
        }

        setState({ data, error: null, isLoading: false });
        return data;
      } catch (error) {
        if (!mountedRef.current || controller.signal.aborted || error?.type === 'cancelled') {
          return null;
        }

        setState((current) => ({ ...current, error, isLoading: false }));
        return null;
      }
    },
    [requestFn]
  );

  useEffect(() => {
    mountedRef.current = true;

    if (immediate) {
      execute();
    } else {
      setState((current) => ({ ...current, isLoading: false }));
    }

    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [execute, immediate]);

  const resetError = useCallback(() => {
    setState((current) => ({ ...current, error: null }));
  }, []);

  const setData = useCallback((updater) => {
    setState((current) => ({
      ...current,
      data: typeof updater === 'function' ? updater(current.data) : updater
    }));
  }, []);

  return {
    ...state,
    execute,
    resetError,
    setData
  };
}
