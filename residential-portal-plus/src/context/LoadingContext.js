import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { subscribeToRequestState } from '../utils/api';

const LoadingContext = createContext({ isLoading: false, activeRequests: 0 });

export function LoadingProvider({ children }) {
  const [activeRequests, setActiveRequests] = useState(0);

  useEffect(() => subscribeToRequestState(setActiveRequests), []);

  const value = useMemo(
    () => ({
      activeRequests,
      isLoading: activeRequests > 0,
    }),
    [activeRequests]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useGlobalLoading() {
  return useContext(LoadingContext);
}
