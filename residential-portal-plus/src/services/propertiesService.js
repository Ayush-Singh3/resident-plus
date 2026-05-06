import api from '../utils/api';

export function fetchProperties(config = {}) {
  return api.get('/properties.json', config);
}

export function deleteProperty(id, config = {}) {
  return api.post('/properties/delete', { id }, config).catch((error) => {
    if (error?.code === 'NOT_FOUND') {
      return { ok: true };
    }

    throw error;
  });
}
