/**
 * Root Cause Page — Análisis de causas raíz.
 *
 * Semántica: <section> con aria-labelledby, <label> en filtros, th scope.
 */

import Spinner from '../components/Spinner/Spinner';
import { useRootCause } from '../../controllers/hooks/useRootCause';

function RootCausePage() {
  const { analysis, loading, error } = useRootCause();

  if (loading) return <Spinner text="Cargando análisis..." />;
  if (error) return <div className="alert alert-danger m-4" role="alert">{error}</div>;

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">🔍 Análisis de Causas Raíz</h1>

      {/* Filtros */}
      <section aria-labelledby="rc-filters-heading" className="mb-4">
        <h2 id="rc-filters-heading" className="visually-hidden">Filtros de análisis</h2>
        <div className="row g-3">
          <div className="col-6 col-md-3">
            <label htmlFor="rc-category" className="form-label">Categoría</label>
            <select className="form-select" id="rc-category" aria-label="Filtrar por categoría">
              <option value="">Todas</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Red">Red</option>
              <option value="Seguridad">Seguridad</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <label htmlFor="rc-date-from" className="form-label">Desde</label>
            <input type="date" className="form-control" id="rc-date-from" />
          </div>
          <div className="col-6 col-md-3">
            <label htmlFor="rc-date-to" className="form-label">Hasta</label>
            <input type="date" className="form-control" id="rc-date-to" />
          </div>
        </div>
      </section>

      {/* Tabla de causas */}
      <section aria-labelledby="rc-table-heading">
        <h2 id="rc-table-heading" className="visually-hidden">Causas identificadas</h2>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title h5">Causas identificadas</h3>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Causa</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Incidentes</th>
                  </tr>
                </thead>
                <tbody>
                  {analysis.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center text-muted py-3">Sin datos</td>
                    </tr>
                  ) : analysis.map((item, i) => (
                    <tr key={i}>
                      <td>{item.cause}</td>
                      <td>{item.category}</td>
                      <td>{item.incidentCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RootCausePage;
