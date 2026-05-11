import { useDashboard } from '../../../controllers/hooks/useDashboard';

export function useDashboardLogic() {
  const { metrics, loading, error } = useDashboard();

  // Variables por defecto si no hay data (para pintar el dashboard sin importar el error)
  const data = metrics || {
    totalIncidents: 0,
    openIncidents: 0,
    resolvedToday: 0
  };

  return {
    data,
    loading,
    error
  };
}
