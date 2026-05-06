import api from '../utils/api';

export function fetchDashboardStats(config = {}) {
  return api.get('/stats.json', config);
}
