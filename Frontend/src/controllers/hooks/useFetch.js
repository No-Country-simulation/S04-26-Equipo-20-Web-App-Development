/**
 * useFetch — Hook genérico para peticiones HTTP.
 */
import { useState, useEffect } from 'react';

export function useFetch(fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const execute = async () => {
      setLoading(true);
      try {
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err.message || 'Error en la petición');
      } finally {
        setLoading(false);
      }
    };
    execute();
  }, dependencies);

  return { data, loading, error, setData };
}
