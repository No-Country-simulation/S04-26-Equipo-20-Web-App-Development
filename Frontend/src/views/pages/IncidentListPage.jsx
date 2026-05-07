//import React from "react";
import  StatusBadge from "../components/StatusBadge/StatusBadge"; // Reutilizando tu componente

const INCIDENTS_DATA = [
  {
    id: "#INC-5829",
    title: "Fuga de gas - Sector Industrial B",
    date: "24 Oct, 14:30",
    location: "Planta Central",
    status: "Pendiente",
    variant: "danger",
  },
  {
    id: "#INC-5824",
    title: "Falla de suministro eléctrico",
    date: "24 Oct, 12:15",
    reporter: "Ing. Ramírez",
    status: "En Proceso",
    variant: "primary",
  },
  {
    id: "#INC-5812",
    title: "Acceso no autorizado - Puerta Norte",
    date: "23 Oct, 19:45",
    closedBy: "Admin",
    status: "Resuelto",
    variant: "success",
  },
  {
    id: "#INC-5801",
    title: "Alarma de incendio - Almacén 4",
    date: "23 Oct, 08:20",
    priority: "Crítico",
    status: "Pendiente",
    variant: "danger",
  },
];

const IncidentListPage = () => {
  return (
    <main
      className="container-fluid pb-5 mb-5"
      style={{ backgroundColor: "#F8F9FA", minHeight: "100vh" }}
    >
      {/* Header & Search */}
      <header
        className="pt-4 pb-3 sticky-top bg-white px-3 shadow-sm"
        style={{ zIndex: 1020 }}
      >
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-shield-lock-fill me-2 fs-4"></i>
          <h1 className="h5 fw-bold mb-0">CoreIncident</h1>
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
          className="d-flex gap-2 overflow-auto pb-2 no-scrollbar"
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
        {INCIDENTS_DATA.map((incident, index) => (
          <article
            key={index}
            className="card border-0 shadow-sm rounded-4 mb-3 p-3 position-relative"
            style={{ borderLeft: `4px solid var(--bs-${incident.variant})` }}
          >
            <div className="d-flex justify-content-between align-items-start mb-2">
              <span className="text-muted fw-medium small">{incident.id}</span>
              <StatusBadge
                status={incident.status}
                variant={incident.variant}
              />
            </div>

            <h2 className="h6 fw-bold mb-3">{incident.title}</h2>

            <div className="d-flex flex-wrap gap-3 text-muted small">
              <div className="d-flex align-items-center">
                <i className="bi bi-calendar3 me-1"></i>
                {incident.date}
              </div>
              <div className="d-flex align-items-center">
                <i
                  className={`bi ${incident.location ? "bi-geo-alt" : incident.priority ? "bi-exclamation-octagon" : "bi-person"} me-1`}
                ></i>
                {incident.location ||
                  incident.priority ||
                  incident.reporter ||
                  incident.closedBy}
              </div>
            </div>
          </article>
        ))}

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

      {/* Floating Action Button */}
      {/*<button
        className="btn btn-dark rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center"
        style={{
          width: "56px",
          height: "56px",
          bottom: "90px",
          right: "20px",
          zIndex: 1030,
        }}
        aria-label="Nuevo incidente"
      >
        <i className="bi bi-plus-lg fs-3"></i>
      </button>*/}

      {/* Footer Copyright */}
      <footer className="text-center py-4 px-3 text-muted border-top mt-2">
        <p className="small mb-1">
          © 2024 CoreIncident. Command and Control Systems.
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
    </main>
  );
};

export default IncidentListPage;
