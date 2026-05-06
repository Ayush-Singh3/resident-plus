import useApiRequest from './useApiRequest';
import { fetchDashboardStats } from '../services/dashboardService';

export default function useDashboardStats() {
  return useApiRequest(({ signal }) => fetchDashboardStats({ signal }), {
    initialData: null,
  });
}
