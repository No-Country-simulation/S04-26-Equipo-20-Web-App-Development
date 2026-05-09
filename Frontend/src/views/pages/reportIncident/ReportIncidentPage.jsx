import { INCIDENT_PRIORITY, INCIDENT_CATEGORIES } from '../../../models/schemas/incidentSchema';
import { useReportIncidentLogic } from './reportIncident';

function ReportIncidentPage() {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleReset
  } = useReportIncidentLogic();

  return (
    <main
      className="container-fluid min-vh-100 pb-5 mb-5"
      style={{ backgroundColor: "#F8F9FA" }}
    >
      {/* Header Semántico */}
      <header
        className="bg-white p-3 shadow-sm sticky-top d-flex align-items-center justify-content-between"
        style={{ zIndex: 1020 }}
      >
        <div className="d-flex align-items-center">
          <i className="bi bi-shield-lock-fill fs-4 me-2"></i>
          <h1 className="h5 fw-bold mb-0">CoreIncident</h1>
        </div>
        <button
          className="btn border-0 p-0 position-relative"
          aria-label="Notificaciones"
        >
          <i className="bi bi-bell fs-4"></i>
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
        </button>
      </header>

      <div aria-live="polite" aria-atomic="true">
        {error && (
          <div className="alert alert-danger mx-3 mt-3 mb-0 shadow-sm" role="alert">{error}</div>
        )}
      </div>

      <section className="px-3 pt-4">
        <header className="mb-4">
          <h2 className="display-6 fw-bold mb-1" style={{ fontSize: "1.75rem" }}>
            Reportar Incidente
          </h2>
          <p className="text-muted small">
            Complete los detalles para iniciar el protocolo de respuesta.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          {/* Título */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small text-uppercase">
              Título del Incidente
            </label>
            <input
              name="title"
              value={formData.title}
              type="text"
              className="form-control form-control-lg border-2 rounded-3 fs-6"
              placeholder="Ej: Falla de red en zona A"
              onChange={handleChange}
              required
            />
          </div>

          {/* Prioridad y Categoría */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small text-uppercase">
              Prioridad
            </label>
            <select
              name="priority"
              value={formData.priority}
              className="form-select form-select-lg border-2 rounded-3 fs-6 text-muted"
              onChange={handleChange}
              required
            >
              <option value="">Seleccione prioridad</option>
              {Object.entries(INCIDENT_PRIORITY).map(([key, value]) => (
                <option key={key} value={value}>{key}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label fw-bold text-muted small text-uppercase">
              Categoría
            </label>
            <select
              name="category"
              value={formData.category}
              className="form-select form-select-lg border-2 rounded-3 fs-6 text-muted"
              onChange={handleChange}
              required
            >
              <option value="">Seleccione categoría</option>
              {INCIDENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label fw-bold text-muted small text-uppercase">
              Asignar a (Opcional)
            </label>
            <input
              name="assignedTo"
              value={formData.assignedTo}
              type="text"
              className="form-control form-control-lg border-2 rounded-3 fs-6 text-muted"
              placeholder="Ej: Ing. Ramírez"
              onChange={handleChange}
            />
          </div>

          {/* Descripción */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small text-uppercase">
              Descripción detallada
            </label>
            <textarea
              name="description"
              value={formData.description}
              className="form-control border-2 rounded-3 fs-6"
              rows="4"
              placeholder="Describa los hechos ocurridos..."
              onChange={handleChange}
              required
              minLength={10}
            ></textarea>
            <div className="d-flex align-items-center mt-2 text-muted small">
              <i className="bi bi-info-circle me-1"></i>
              <span>Proporcione el mayor detalle posible.</span>
            </div>
          </div>

          {/* Evidencia Visual */}
          <div className="form-group">
            <div
              className="card border-0 rounded-4 overflow-hidden position-relative shadow-sm"
              style={{ cursor: "pointer" }}
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                className="card-img"
                alt="Vista previa evidencia"
                style={{
                  height: "160px",
                  objectFit: "cover",
                  filter: "brightness(0.5)",
                }}
              />
              <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center text-white text-center">
                <i className="bi bi-camera-fill fs-1 mb-2"></i>
                <span className="fw-bold">Adjuntar Evidencia Visual</span>
              </div>
            </div>
          </div>

          {/* Botones de Envío y Limpiar */}
          <div className="d-flex flex-column gap-2 mt-2">
            <button
              type="submit"
              className="btn btn-dark btn-lg w-100 rounded-3 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              ) : (
                <i className="bi bi-save"></i>
              )}
              <span className="fw-bold">{loading ? 'Enviando...' : 'Guardar Incidente'}</span>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg w-100 rounded-3 py-2"
              onClick={handleReset}
            >
              Limpiar Formulario
            </button>
          </div>
        </form>
      </section>

      {/* Espacio para que la Navbar no tape el botón */}
      <div style={{ height: "80px" }}></div>
    </main>
  );
}

export default ReportIncidentPage;
