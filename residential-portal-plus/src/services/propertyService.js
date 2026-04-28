import apiClient from './api/client';
import { getApiBase } from './api/config';

export async function getProperties() {
  const response = await apiClient.get('/properties.json');
  return response.data;
}

export async function deleteProperty(id) {
  if (getApiBase() === '/mock') {
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    return;
  }

  await apiClient.post('/properties/delete', { id });
}
