import { useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Spinner from "../../components/Spinner/Spinner";
import { useIncidentListLogic } from "./incidentList";
import AssignTechnicianModal from "../../modals/AssignTechnicianModal";
import IncidentDetailsModal from "../../modals/IncidentDetailsModal";

const IncidentListPage = () => {
  const { incidents, loading, error } = useIncidentListLogic();

  // Estados para controlar el modal de asignación
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Estados para controlar el modal de detalles
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // El incidente seleccionado que compartirán ambos modales
  const [selectedIncident, setSelectedIncident] = useState(null);

  if (loading) return <Spinner text="Cargando incidentes..." />;

  return (
    <main
      className="container-fluid pb-5 mb-5"
      style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}
    >
      {/* Alerta de error no bloqueante */}
      <div aria-live="polite" aria-atomic="true">
        {error && (
          <div
            className="alert alert-danger mx-3 mt-3 mb-0 shadow-sm"
            role="alert"
          >
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}
      </div>

      {/* Header & Search */}
      <header
        className="pt-4 pb-3 sticky-top bg-white px-3 shadow-sm"
        style={{ zIndex: 1020 }}
      >
        <div className="d-flex align-items-center mb-3 justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-shield-lock-fill me-2 fs-4"></i>
            <h1 className="h5 fw-bold mb-0">CoreIncident</h1>
          </div>
          <Link
            to="/incidents/new"
            className="btn btn-primary btn-sm rounded-pill px-3"
          >
            <i className="bi bi-plus-lg me-1"></i> Reportar
          </Link>
        </div>

        <div className="input-group mb-3 border rounded-3 overflow-hidden shadow-sm">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-search text-muted"></i>
          </span>
          <input
            type="search"
            className="form-control border-0 ps-0"
            placeholder="Buscar incidentes..."
            aria-label="Buscar"
          />
        </div>

        {/* Filtros / Chips */}
        <nav
          className="d-flex gap-2 overflow-auto pb-2"
          style={{ whiteSpace: "nowrap" }}
        >
          <button className="btn btn-dark btn-sm rounded-pill px-3">
            Todos
          </button>
          <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">
            Pendientes
          </button>
          <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">
            En Proceso
          </button>
          <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">
            Resueltos
          </button>
        </nav>
      </header>

      {/* Listado de Incidentes */}
      <section className="px-3 mt-3">
        {incidents.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-inbox fs-1 d-block mb-3"></i>
            <p>No hay incidentes registrados</p>
          </div>
        ) : (
          incidents.map((incident) => (
            <article
              key={incident.id}
              className="card border-0 shadow-sm rounded-4 mb-3 p-3 position-relative"
              style={{
                borderLeft: `4px solid var(--bs-${incident.priority === "CRITICAL" ? "danger" : incident.priority === "HIGH" ? "warning" : "primary"})`,
              }}
            >
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="text-muted fw-medium small">
                  #{incident.id}
                </span>
                <StatusBadge status={incident.status} />
              </div>

              {/* El título vuelve a ser texto limpio sin comportamientos de link */}
              <h2 className="h6 fw-bold mb-3 text-dark">{incident.title}</h2>

              <div className="d-flex flex-wrap gap-3 text-muted small align-items-center">
                <div className="d-flex align-items-center">
                  <i className="bi bi-calendar3 me-1"></i>
                  {incident.createdAt || "Sin fecha"}
                </div>
                <div className="d-flex align-items-center">
                  <i
                    className={`bi ${incident.category ? "bi-geo-alt" : incident.priority ? "bi-exclamation-octagon" : "bi-person"} me-1`}
                  ></i>
                  {incident.category ||
                    incident.priority ||
                    incident.assignedTo ||
                    "General"}
                </div>

                {/* BOTONES DE ACCIÓN EN LA TARJETA */}
                <div className="ms-auto d-flex gap-2">
                  {/* Botón para abrir Detalles */}
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-pill px-3"
                    style={{ fontSize: "12px" }}
                    onClick={() => {
                      setSelectedIncident(incident);
                      setIsDetailsModalOpen(true);
                    }}
                  >
                    <i className="bi bi-eye me-1"></i> Detalles
                  </button>

                  {/* Botón para abrir Asignación */}
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark rounded-pill px-3"
                    style={{ fontSize: "12px" }}
                    onClick={() => {
                      setSelectedIncident(incident);
                      setIsAssignModalOpen(true);
                    }}
                  >
                    Asignar
                  </button>
                </div>
              </div>
            </article>
          ))
        )}

        {/* Banner de Monitoreo */}
        <div className="card border-0 rounded-4 overflow-hidden mb-4 shadow-sm position-relative text-white">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
            className="card-img"
            alt="Centro de monitoreo"
            style={{
              height: "160px",
              objectFit: "cover",
              filter: "brightness(0.6)",
            }}
          />
          <div className="card-img-overlay d-flex flex-column justify-content-end">
            <h3 className="h6 fw-bold mb-1">
              Monitoreo de Infraestructura Activo
            </h3>
            <p className="small mb-0 opacity-75">
              Sistemas operando al 99.9% de capacidad
            </p>
          </div>
        </div>
      </section>

      {/* Footer Copyright */}
      <footer className="text-center py-4 px-3 text-muted border-top mt-2">
        <p className="small mb-1">
          © 2026 CoreIncident. Command and Control Systems.
        </p>
        <div className="d-flex justify-content-center gap-3 small">
          <a href="#" className="text-decoration-none text-muted">
            Soporte
          </a>
          <a href="#" className="text-decoration-none text-muted">
            Privacidad
          </a>
          <a href="#" className="text-decoration-none text-muted">
            Términos
          </a>
        </div>
      </footer>

      {/* MODAL 1: ASIGNAR TÉCNICO */}
      <AssignTechnicianModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        incident={selectedIncident}
        onAssign={(incidentId, techId) => {
          console.log(`Asignando incidente ${incidentId} al tecnico ${techId}`);
          setIsAssignModalOpen(false);
        }}
      />

      {/* MODAL 2: DETALLES DEL INCIDENTE */}
      <IncidentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        incident={selectedIncident}
      />
    </main>
  );
};

export default IncidentListPage;
