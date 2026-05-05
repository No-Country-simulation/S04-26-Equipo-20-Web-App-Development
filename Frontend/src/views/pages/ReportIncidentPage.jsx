/**
 * Report Incident Page — Formulario para reportar un nuevo incidente.
 *
 * Semántica: <section> con aria-labelledby, aria-describedby en campos.
 * A11Y: aria-live en errores, aria-required, role=alert.
 */

import { useState } from 'react';
import { useIncidents } from '../../controllers/hooks/useIncidents';
import { INCIDENT_PRIORITY, INCIDENT_CATEGORIES, defaultIncident } from '../../models/schemas/incidentSchema';

function ReportIncidentPage() {
  const [formData, setFormData] = useState({ ...defaultIncident });
  const { createIncident, loading, error } = useIncidents();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createIncident(formData);
  };

  return (
    <section className="container py-4" aria-labelledby="report-heading">
      <h1 id="report-heading" className="mb-4">➕ Reportar Incidente</h1>

      <div aria-live="polite" aria-atomic="true">
        {error && (
          <div className="alert alert-danger" role="alert">{error}</div>
        )}
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="report-title" className="form-label">
                Título del incidente <span aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="report-title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Describe brevemente el incidente"
                required
                aria-required="true"
                minLength={5}
                aria-describedby="title-help"
              />
              <div id="title-help" className="form-text">Mínimo 5 caracteres.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="report-description" className="form-label">
                Descripción detallada <span aria-hidden="true">*</span>
              </label>
              <textarea
                className="form-control"
                id="report-description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Explica qué sucedió, dónde, y qué impacto tiene"
                required
                aria-required="true"
                minLength={10}
                aria-describedby="desc-help"
              />
              <div id="desc-help" className="form-text">Mínimo 10 caracteres.</div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6 col-md-6">
                <label htmlFor="report-priority" className="form-label">
                  Prioridad <span aria-hidden="true">*</span>
                </label>
                <select
                  className="form-select"
                  id="report-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  {Object.entries(INCIDENT_PRIORITY).map(([key, value]) => (
                    <option key={key} value={value}>{key}</option>
                  ))}
                </select>
              </div>

              <div className="col-6 col-md-6">
                <label htmlFor="report-category" className="form-label">
                  Categoría <span aria-hidden="true">*</span>
                </label>
                <select
                  className="form-select"
                  id="report-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  aria-required="true"
                >
                  <option value="">Seleccionar...</option>
                  {INCIDENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="report-assigned" className="form-label">Asignar a</label>
              <input
                type="text"
                className="form-control"
                id="report-assigned"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                placeholder="Nombre o ID del responsable (opcional)"
              />
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
                {loading ? 'Enviando...' : '📤 Enviar Reporte'}
              </button>
              <button
                type="reset"
                className="btn btn-outline-secondary"
                onClick={() => setFormData({ ...defaultIncident })}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReportIncidentPage;
