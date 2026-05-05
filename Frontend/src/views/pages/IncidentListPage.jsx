/**
 * Incident List Page — Lista de todos los incidentes con filtros.
 *
 * Semántica: <section> con aria-labelledby, <label> en filtros, aria-label en botones.
 * A11Y: labels asociados a selects, aria-label en botón emoji, table caption.
 */

import { useIncidents } from '../../controllers/hooks/useIncidents';
import StatusBadge from '../components/StatusBadge/StatusBadge';
import Spinner from '../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import { INCIDENT_STATUS, INCIDENT_PRIORITY } from '../../models/schemas/incidentSchema';

function IncidentListPage() {
  const { incidents, loading, error, deleteIncident } = useIncidents();

  if (loading) return <Spinner text="Cargando incidentes..." />;

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert" aria-live="polite">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>🔔 Incidentes</h1>
        <Link to="/incidents/new" className="btn btn-primary">
          ➕ Reportar Incidente
        </Link>
      </div>

      {/* Filtros */}
      <section aria-labelledby="filters-heading" className="mb-4">
        <h2 id="filters-heading" className="visually-hidden">Filtros de incidentes</h2>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <label htmlFor="filterStatus" className="form-label">Estado</label>
            <select className="form-select" id="filterStatus" aria-label="Filtrar por estado">
              <option value="">Todos los estados</option>
              {Object.entries(INCIDENT_STATUS).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
              ))}
            </select>
          </div>
          <div className="col-6 col-md-3">
            <label htmlFor="filterPriority" className="form-label">Prioridad</label>
            <select className="form-select" id="filterPriority" aria-label="Filtrar por prioridad">
              <option value="">Todas las prioridades</option>
              {Object.entries(INCIDENT_PRIORITY).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="searchIncident" className="form-label">Buscar</label>
            <input
              type="search"
              className="form-control"
              id="searchIncident"
              placeholder="Buscar incidente..."
              aria-label="Buscar incidentes por texto"
            />
          </div>
        </div>
      </section>

      {/* Tabla de incidentes */}
      <section aria-labelledby="table-heading">
        <h2 id="table-heading" className="visually-hidden">Lista de incidentes</h2>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <caption className="visually-hidden">
                Tabla con {incidents.length} incidentes registrados
              </caption>
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Título</th>
                  <th scope="col">Prioridad</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {incidents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No hay incidentes registrados
                    </td>
                  </tr>
                ) : (
                  incidents.map((incident) => (
                    <tr key={incident.id}>
                      <td>#{incident.id}</td>
                      <td>
                        <Link to={`/incidents/${incident.id}`}>
                          {incident.title}
                        </Link>
                      </td>
                      <td>
                        <span className={`badge bg-${incident.priority === 'critical' ? 'danger' : incident.priority === 'high' ? 'warning' : 'info'}`}>
                          {incident.priority}
                        </span>
                      </td>
                      <td><StatusBadge status={incident.status} /></td>
                      <td>{incident.createdAt || '--'}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteIncident(incident.id)}
                          type="button"
                          aria-label={`Eliminar incidente ${incident.title}`}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IncidentListPage;
