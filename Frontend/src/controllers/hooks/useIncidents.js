/**
 * useIncidents — Hook controlador para incidentes.
 *
 * Conecta IncidentContext (Model) con las Views de incidentes.
 * Performance: useCallback en handlers para evitar re-renders innecesarios.
 */

import { useContext, useState, useEffect, useCallback } from 'react';
import { IncidentContext } from '../../models/store/IncidentContext';
import incidentService from '../../models/services/incidentService';
import { validateIncident } from '../../models/schemas/incidentSchema';
import { useNavigate } from 'react-router-dom';

export function useIncidents(incidentId = null) {
  const { incidents, setIncidents } = useContext(IncidentContext);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchIncidents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await incidentService.getAll();
      setIncidents(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar incidentes');
    } finally {
      setLoading(false);
    }
  }, [setIncidents]);

  // Cargar un incidente específico por ID
  useEffect(() => {
    if (incidentId) {
      setLoading(true);
      setError(null);
      incidentService.getById(incidentId)
        .then(setSelectedIncident)
        .catch((err) => setError(err.message || 'Error al cargar detalle'))
        .finally(() => setLoading(false));
    }
  }, [incidentId]);

  // Cargar incidentes al montar (solo si no hay ID específico)
  useEffect(() => {
    if (!incidentId) {
      fetchIncidents();
    }
  }, [incidentId, fetchIncidents]);

  const createIncident = useCallback(async (data) => {
    const { isValid, errors } = validateIncident(data);
    if (!isValid) {
      setError(Object.values(errors).join(', '));
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newIncident = await incidentService.create(data);
      setIncidents((prev) => [...prev, newIncident]);
      navigate('/incidents');
    } catch (err) {
      setError(err.message || 'Error al crear incidente');
    } finally {
      setLoading(false);
    }
  }, [setIncidents, navigate]);

  const deleteIncident = useCallback(async (id) => {
    if (!window.confirm('¿Eliminar este incidente?')) return;
    setError(null);
    try {
      await incidentService.delete(id);
      setIncidents((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      setError(err.message || 'Error al eliminar');
    }
  }, [setIncidents]);

  return {
    incidents,
    selectedIncident,
    loading,
    error,
    createIncident,
    deleteIncident,
    fetchIncidents,
  };
}
