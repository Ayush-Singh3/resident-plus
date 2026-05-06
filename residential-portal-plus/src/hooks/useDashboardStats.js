import { useCallback } from 'react';
import { useApiRequest } from './useApiRequest';
import { fetchStats } from '../services/statsService';

export function useDashboardStats() {
  const request = useCallback((config) => fetchStats(config), []);
  return useApiRequest(request, { immediate: true, initialData: null });
}
