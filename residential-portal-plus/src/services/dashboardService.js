import apiClient from './api/client';

export async function getDashboardStats() {
  const response = await apiClient.get('/stats.json');
  return response.data;
}
