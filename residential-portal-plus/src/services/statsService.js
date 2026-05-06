import { get } from './http';

export function fetchStats(config) {
  return get('/stats', config);
}
