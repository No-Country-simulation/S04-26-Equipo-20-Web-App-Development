/**
 * useDashboard — Hook controlador para el dashboard.
 */
import { useState, useEffect } from 'react';
import dashboardService from '../../models/services/dashboardService';
import { defaultMetrics } from '../../models/schemas/dashboardSchema';

export function useDashboard() {
  const [metrics, setMetrics] = useState(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await dashboardService.getMetrics();
        setMetrics(data);
      } catch (err) {
        setError(err.message || 'Error al cargar métricas');
        setMetrics(defaultMetrics);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return { metrics, loading, error };
}
