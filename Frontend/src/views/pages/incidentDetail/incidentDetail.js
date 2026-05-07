import { useParams, useNavigate } from 'react-router-dom';
import { useIncidents } from '../../../controllers/hooks/useIncidents';

export function useIncidentDetailLogic() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedIncident, loading, error } = useIncidents(id);

  const handleGoBack = () => navigate(-1);

  return {
    selectedIncident,
    loading,
    error,
    handleGoBack
  };
}
