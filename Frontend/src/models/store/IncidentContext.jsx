/**
 * Incident Context — Estado global de incidentes.
 * 
 * Provee: incidents, loading, error, setIncidents.
 */

import { createContext, useState } from 'react';

export const IncidentContext = createContext(null);

export function IncidentProvider({ children }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    incidents,
    setIncidents,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <IncidentContext value={value}>
      {children}
    </IncidentContext>
  );
}

export default IncidentContext;
