import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with loading, error, and refetch capabilities
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchFunction();
      setData(response.data || response);
    } catch (err) {
      setError(err.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
};
