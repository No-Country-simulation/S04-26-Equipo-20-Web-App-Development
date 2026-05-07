import { useIncidents } from '../../../controllers/hooks/useIncidents';

export function useIncidentListLogic() {
  const { incidents, loading, error, deleteIncident } = useIncidents();

  return {
    incidents,
    loading,
    error,
    deleteIncident
  };
}
