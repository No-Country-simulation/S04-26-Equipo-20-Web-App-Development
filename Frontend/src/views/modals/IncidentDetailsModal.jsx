import StatusBadge from "../components/StatusBadge/StatusBadge";

const IncidentDetailsModal = ({ isOpen, onClose, incident }) => {
    if (!isOpen || !incident) return null;

    // Mapear colores de borde según la prioridad para mantener consistencia visual
    const priorityColors = {
        CRITICAL: "danger",
        HIGH: "warning",
        MEDIUM: "primary",
        LOW: "secondary",
    };

    const currentPriorityColor = priorityColors[incident.priority] || "primary";

    return (
        <>
            {/* Fondo oscuro detrás del modal */}
            <div className="modal-backdrop fade show" onClick={onClose}></div>

            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div
                    className="modal-dialog modal-dialog-centered modal-lg"
                    role="document"
                >
                    <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
                        {/* Línea superior indicando la prioridad de forma elegante */}
                        <div
                            className={`bg-${currentPriorityColor}`}
                            style={{ height: "5px", width: "100%" }}
                        ></div>

                        <header className="modal-header border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
                            <div>
                                <div className="d-flex align-items-center gap-2 mb-1">
                                    <span className="text-muted fw-bold small">
                                        #{incident.id}
                                    </span>
                                    <StatusBadge status={incident.status} />
                                </div>
                                <h5 className="modal-title fw-bold text-dark">
                                    {incident.title}
                                </h5>
                            </div>
                            <button
                                type="button"
                                className="btn-close shadow-none"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </header>

                        <div className="modal-body px-4 py-3">
                            <div className="row g-4">
                                {/* Panel Izquierdo: Descripción principal */}
                                <div className="col-12 col-md-7">
                                    <div className="bg-light p-3 rounded-4 h-100">
                                        <h6 className="fw-bold text-secondary small mb-2">
                                            Descripción del Incidente
                                        </h6>
                                        <p
                                            className="text-dark mb-0 style-scroll"
                                            style={{
                                                whiteSpace: "pre-line",
                                                fontSize: "14px",
                                                maxHeight: "200px",
                                                overflowY: "auto",
                                            }}
                                        >
                                            {incident.description ||
                                                "No se proporcionó una descripción detallada para este incidente."}
                                        </p>
                                    </div>
                                </div>

                                {/* Panel Derecho: Metadatos y Detalles */}
                                <div className="col-12 col-md-5">
                                    <div className="card border-0 bg-white shadow-sm p-3 rounded-4">
                                        <h6 className="fw-bold text-secondary small mb-3 border-bottom pb-2">
                                            Información del Sistema
                                        </h6>

                                        <div className="d-flex flex-column gap-3">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="text-muted small">
                                                    <i className="bi bi-exclamation-octagon me-2"></i>
                                                    Prioridad:
                                                </span>
                                                <span
                                                    className={`badge bg-${currentPriorityColor}-subtle text-${currentPriorityColor} rounded-pill px-2 py-1 fw-bold`}
                                                >
                                                    {incident.priority || "MEDIUM"}
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="text-muted small">
                                                    <i className="bi bi-tags me-2"></i>Categoría:
                                                </span>
                                                <span className="text-dark fw-semibold small">
                                                    {incident.category || "General"}
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="text-muted small">
                                                    <i className="bi bi-calendar3 me-2"></i>Reportado:
                                                </span>
                                                <span className="text-dark small">
                                                    {incident.createdAt || "Sin fecha"}
                                                </span>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between">
                                                <span className="text-muted small">
                                                    <i className="bi bi-person-badge me-2"></i>Asignado a:
                                                </span>
                                                <span
                                                    className="text-dark fw-semibold small text-truncate"
                                                    style={{ maxWidth: "150px" }}
                                                >
                                                    {incident.assignedTo || "Sin asignar"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="modal-footer border-0 pb-4 px-4 pt-2">
                            <button
                                type="button"
                                className="btn btn-secondary w-100 rounded-3 fw-bold py-2"
                                onClick={onClose}
                            >
                                Cerrar Detalles
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default IncidentDetailsModal;
