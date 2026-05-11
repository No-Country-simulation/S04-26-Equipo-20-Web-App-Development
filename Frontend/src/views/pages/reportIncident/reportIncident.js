import { useState } from 'react';
import { useIncidents } from '../../../controllers/hooks/useIncidents';
import { defaultIncident } from '../../../models/schemas/incidentSchema';

export function useReportIncidentLogic() {
  const [formData, setFormData] = useState({ ...defaultIncident });
  const { createIncident, loading, error } = useIncidents();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createIncident(formData);
  };

  const handleReset = () => {
    setFormData({ ...defaultIncident });
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleReset
  };
}
