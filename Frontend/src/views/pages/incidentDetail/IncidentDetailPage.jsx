/**
 * Incident Detail Page — Vista de detalle de un incidente.
 *
 * Semántica: <article> para el incidente, <section> para secciones,
 * <dl> para datos clave-valor.
 */

import StatusBadge from '../../components/StatusBadge/StatusBadge';
import Spinner from '../../components/Spinner/Spinner';
import { useIncidentDetailLogic } from './incidentDetail';

function IncidentDetailPage() {
  const { selectedIncident, loading, error, handleGoBack } = useIncidentDetailLogic();

  if (loading) return <Spinner text="Cargando detalle..." />;

  return (
    <section className="container py-4" aria-labelledby="detail-heading">
      <nav aria-label="Volver">
        <button className="btn btn-outline-secondary mb-3" onClick={handleGoBack} type="button">
          ← Volver
        </button>
      </nav>

      {/* Alerta de error no bloqueante */}
      <div aria-live="polite" aria-atomic="true">
        {error && (
          <div className="alert alert-danger mb-3 shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}
      </div>

      <article className="card" aria-labelledby="detail-heading">
        <header className="card-header d-flex justify-content-between align-items-center">
          <h1 id="detail-heading" className="h3 mb-0">Incidente #{selectedIncident.id}</h1>
          <StatusBadge status={selectedIncident.status} />
        </header>
        <div className="card-body">
          <h2 className="h4">{selectedIncident.title}</h2>
          <p className="text-muted">{selectedIncident.description}</p>

          <dl className="row mt-4">
            <dt className="col-sm-4">Prioridad</dt>
            <dd className="col-sm-8">{selectedIncident.priority}</dd>

            <dt className="col-sm-4">Categoría</dt>
            <dd className="col-sm-8">{selectedIncident.category}</dd>

            <dt className="col-sm-4">Asignado a</dt>
            <dd className="col-sm-8">{selectedIncident.assignedTo || 'Sin asignar'}</dd>

            <dt className="col-sm-4">Fecha de creación</dt>
            <dd className="col-sm-8">{selectedIncident.createdAt || '--'}</dd>

            <dt className="col-sm-4">Última actualización</dt>
            <dd className="col-sm-8">{selectedIncident.updatedAt || '--'}</dd>
          </dl>
        </div>
      </article>
    </section>
  );
}

export default IncidentDetailPage;
