import apiClient from './api/client';

export async function getTenants() {
  const response = await apiClient.get('/tenants.json');
  return response.data;
}
