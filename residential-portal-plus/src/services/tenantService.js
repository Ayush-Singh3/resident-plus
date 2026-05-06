import { get } from './http';

export function fetchTenants(config) {
  return get('/tenants', config);
}
