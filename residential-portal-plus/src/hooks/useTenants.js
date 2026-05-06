import { useCallback } from 'react';
import { useApiRequest } from './useApiRequest';
import { fetchTenants } from '../services/tenantService';

export function useTenants() {
  const request = useCallback((config) => fetchTenants(config), []);
  return useApiRequest(request, { immediate: true, initialData: [] });
}
