import { useCallback, useEffect, useState } from 'react';
import { getErrorMessage } from '../services/api/client';

export default function useApiQuery(queryFn, initialValue) {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const runQuery = useCallback(async () => {
    setIsRefreshing(true);
    setError('');

    try {
      const nextData = await queryFn();
      setData(nextData);
      return nextData;
    } catch (queryError) {
      setError(getErrorMessage(queryError));
      throw queryError;
    } finally {
      setIsRefreshing(false);
    }
  }, [queryFn]);

  useEffect(() => {
    let ignoreResult = false;

    setIsRefreshing(true);
    setError('');

    queryFn()
      .then((nextData) => {
        if (!ignoreResult) {
          setData(nextData);
        }
      })
      .catch((queryError) => {
        if (!ignoreResult) {
          setError(getErrorMessage(queryError));
        }
      })
      .finally(() => {
        if (!ignoreResult) {
          setIsRefreshing(false);
        }
      });

    return () => {
      ignoreResult = true;
    };
  }, [queryFn]);

  return {
    data,
    setData,
    error,
    isRefreshing,
    refetch: runQuery,
  };
}
