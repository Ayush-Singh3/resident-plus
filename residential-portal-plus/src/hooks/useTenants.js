import useApiRequest from './useApiRequest';
import { fetchTenants } from '../services/tenantsService';

export default function useTenants() {
  const requestState = useApiRequest(({ signal }) => fetchTenants({ signal }), {
    initialData: [],
  });

  return {
    ...requestState,
    tenants: requestState.data || [],
  };
}
