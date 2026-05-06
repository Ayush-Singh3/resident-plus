import api from '../utils/api';

export function fetchTenants(config = {}) {
  return api.get('/tenants.json', config);
}
