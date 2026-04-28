import { useEffect, useState } from 'react';
import {
  clearGlobalError,
  getGlobalError,
  getLoadingCount,
  subscribeToError,
  subscribeToLoading,
} from '../services/api/state';

export default function useGlobalApiStatus() {
  const [loadingCount, setLoadingCount] = useState(getLoadingCount());
  const [error, setError] = useState(getGlobalError());

  useEffect(() => subscribeToLoading(setLoadingCount), []);
  useEffect(() => subscribeToError(setError), []);

  return {
    isLoading: loadingCount > 0,
    error,
    clearError: clearGlobalError,
  };
}
