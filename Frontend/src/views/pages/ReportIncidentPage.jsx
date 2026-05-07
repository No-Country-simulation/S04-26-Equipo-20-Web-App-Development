import { useState } from 'react';
//import { useIncidents } from '../../controllers/hooks/useIncidents';
//import { INCIDENT_PRIORITY, INCIDENT_CATEGORIES, defaultIncident } from '../../models/schemas/incidentSchema';

function ReportIncidentPage() {
  const [formData, setFormData] = useState({
    title: "",
    priority: "",
    category: "",
    date: "",
    description: "",
  });

  // Función para actualizar el estado dinámicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del incidente a enviar:", formData);
    // Aquí iría la lógica para enviar al backend cuando esté listo
  };

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

      <section className="px-3 pt-4">
        <header className="mb-4">
          <h2
            className="display-6 fw-bold mb-1"
            style={{ fontSize: "1.75rem" }}
          >
            Reportar Incidente
          </h2>
          <p className="text-muted small">
            Complete los detalles para iniciar el protocolo de respuesta.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
          {/* Título */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small uppercase">
              Título del Incidente
            </label>
            <input
              name="title"
              type="text"
              className="form-control form-control-lg border-2 rounded-3 fs-6"
              placeholder="Ej: Falla de red en zona A"
              onChange={handleChange}
              required
            />
          </div>

          {/* Prioridad y Categoría */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small">
              Prioridad
            </label>
            <select
              name="priority"
              className="form-select form-select-lg border-2 rounded-3 fs-6 text-muted"
              onChange={handleChange}
            >
              <option value="">Seleccione prioridad</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label fw-bold text-muted small">
              Categoría
            </label>
            <select
              name="category"
              className="form-select form-select-lg border-2 rounded-3 fs-6 text-muted"
              onChange={handleChange}
            >
              <option value="">Seleccione categoría</option>
              <option value="infraestructura">Infraestructura</option>
              <option value="seguridad">Seguridad Física</option>
              <option value="it">Soporte IT</option>
            </select>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small">
              Fecha de Detección
            </label>
            <input
              name="date"
              type="date"
              className="form-control form-control-lg border-2 rounded-3 fs-6 text-muted"
              onChange={handleChange}
            />
          </div>

          {/* Descripción con Estilo de Error de la Imagen */}
          <div className="form-group">
            <label className="form-label fw-bold text-muted small">
              Descripción detallada
            </label>
            <textarea
              name="description"
              className="form-control border-2 rounded-3 fs-6"
              rows="4"
              placeholder="Describa los hechos ocurridos..."
              style={{ borderColor: "#E57373" }}
              onChange={handleChange}
            ></textarea>
            <div className="d-flex align-items-center mt-2 text-danger small">
              <i className="bi bi-exclamation-circle me-1"></i>
              <span>Este campo es obligatorio para el reporte.</span>
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

          {/* Botón de Envío */}
          <button
            type="submit"
            className="btn btn-dark btn-lg w-100 rounded-3 py-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-save"></i>
            <span className="fw-bold">Guardar Incidente</span>
          </button>
        </form>
      </section>

      {/* Espacio para que la Navbar no tape el botón */}
      <div style={{ height: "80px" }}></div>
    </main>
  );
}

export default ReportIncidentPage;
