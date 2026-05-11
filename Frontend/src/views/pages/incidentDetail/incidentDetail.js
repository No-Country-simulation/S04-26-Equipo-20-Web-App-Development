import { useParams, useNavigate } from 'react-router-dom';
import { useIncidents } from '../../../controllers/hooks/useIncidents';

export function useIncidentDetailLogic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedIncident, loading, error } = useIncidents(id);

  const handleGoBack = () => navigate(-1);

  const safeIncident = selectedIncident || {
    id: id || 'Desconocido',
    title: 'Detalle no disponible',
    description: 'No se pudo cargar la información del incidente. Por favor, verifique su conexión o intente más tarde.',
    status: 'UNKNOWN',
    priority: 'UNKNOWN',
    category: 'UNKNOWN',
    assignedTo: null,
    createdAt: null,
    updatedAt: null
  };

  return {
    selectedIncident: safeIncident,
    loading,
    error,
    handleGoBack
  };
}
