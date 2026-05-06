import { useCallback } from 'react';
import useApiRequest from './useApiRequest';
import { deleteProperty, fetchProperties } from '../services/propertiesService';

export default function useProperties() {
  const requestState = useApiRequest(({ signal }) => fetchProperties({ signal }), {
    initialData: [],
  });

  const removeProperty = useCallback(
    async (id) => {
      await deleteProperty(id);
      requestState.setData((currentProperties) =>
        currentProperties.filter((property) => property.id !== id)
      );
    },
    [requestState.setData]
  );

  return {
    ...requestState,
    properties: requestState.data || [],
    removeProperty,
  };
}
