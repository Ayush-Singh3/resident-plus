import { useSyncExternalStore } from 'react';
import { getLoadingSnapshot, subscribeToLoading } from '../services/loadingStore';

export function useGlobalLoading() {
  return useSyncExternalStore(subscribeToLoading, getLoadingSnapshot, getLoadingSnapshot);
}
