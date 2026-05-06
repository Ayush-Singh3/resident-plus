import { get, post } from './http';

export function fetchProperties(config) {
  return get('/properties', config);
}

export function deleteProperty(id, config) {
  return post('/properties/delete', { id }, config);
}
