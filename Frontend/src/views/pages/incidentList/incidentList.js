import { useIncidents } from '../../../controllers/hooks/useIncidents';

export function useIncidentListLogic() {
  const { incidents, loading, error, deleteIncident } = useIncidents();

  // Arreglo vacío por defecto para que la vista no se rompa si falla la DB
  const safeIncidents = incidents || [];

  return {
    incidents: safeIncidents,
    loading,
    error,
    deleteIncident
  };
}
