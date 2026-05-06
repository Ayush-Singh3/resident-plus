import { useCallback, useState } from 'react';
import { useApiRequest } from './useApiRequest';
import { deleteProperty, fetchProperties } from '../services/propertyService';

export function useProperties() {
  const [actionError, setActionError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const request = useCallback((config) => fetchProperties(config), []);
  const { data, error, isLoading, execute, resetError, setData } = useApiRequest(request, {
    immediate: true,
    initialData: []
  });

  const removeProperty = useCallback(
    async (id) => {
      setActionError(null);
      setIsDeleting(true);

      try {
        await deleteProperty(id);
        setData((currentData) => (currentData || []).filter((item) => item.id !== id));
        return true;
      } catch (requestError) {
        setActionError(requestError);
        return false;
      } finally {
        setIsDeleting(false);
      }
    },
    [setData]
  );

  return {
    data,
    error: actionError || error,
    isLoading,
    isDeleting,
    reload: execute,
    clearError: () => {
      setActionError(null);
      resetError();
    },
    removeProperty
  };
}
