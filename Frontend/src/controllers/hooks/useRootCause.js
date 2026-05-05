/**
 * useRootCause — Hook controlador para análisis de causas raíz.
 */
import { useState, useEffect } from 'react';
import rootCauseService from '../../models/services/rootCauseService';

export function useRootCause() {
  const [analysis, setAnalysis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const data = await rootCauseService.getAnalysis();
        setAnalysis(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Error al cargar análisis');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  return { analysis, loading, error };
}
