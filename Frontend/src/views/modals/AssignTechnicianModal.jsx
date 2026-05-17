import { useState, useEffect } from "react";

const AssignTechnicianModal = ({ isOpen, onClose, incident, onAssign }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const [loading, setLoading] = useState(false);

    // Simulación de carga de técnicos desde la base de datos (Prisma)
    useEffect(() => {
        if (!isOpen) return;

        // Ya no necesitas poner setLoading(true) aquí arriba de forma síncrona

        setTimeout(() => {
            setTechnicians([
                {
                    id: 1,
                    name: "Carlos Mendoza",
                    email: "carlos@opscore.com",
                    status: "Disponible",
                },
                {
                    id: 2,
                    name: "Ana Patria Santos",
                    email: "ana@opscore.com",
                    status: "Ocupado",
                },
                {
                    id: 3,
                    name: "José Alberto Feliz",
                    email: "jose@opscore.com",
                    status: "Disponible",
                },
            ]);
            setLoading(false); // Solo apagas el spinner cuando los datos llegan
        }, 500);
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredTechs = technicians.filter((tech) =>
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            {/* Backdrop de Bootstrap para oscurecer el fondo */}
            <div className="modal-backdrop fade show" onClick={onClose}></div>

            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div
                    className="modal-dialog modal-dialog-centered modal-md"
                    role="document"
                >
                    <div className="modal-content border-0 rounded-4 shadow-lg">
                        <header className="modal-header border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="modal-title fw-bold">Asignar Técnico</h5>
                                <p className="text-muted small mb-0">
                                    Incidente:{" "}
                                    <span className="fw-semibold text-dark">
                                        #{incident?.id} - {incident?.title}
                                    </span>
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn-close shadow-none"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </header>

                        <div className="modal-body px-4">
                            {/* Buscador de Técnicos */}
                            <div className="input-group mb-3 bg-light rounded-3 p-1">
                                <span className="input-group-text bg-transparent border-0 text-muted">
                                    <i className="bi bi-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control bg-transparent border-0 shadow-none"
                                    placeholder="Buscar técnico por nombre..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Lista/Tabla de Técnicos */}
                            <div className="overflow-auto" style={{ maxHeight: "250px" }}>
                                {loading ? (
                                    <div className="text-center py-4">
                                        <div
                                            className="spinner-border spinner-border-sm text-dark"
                                            role="status"
                                        ></div>
                                    </div>
                                ) : filteredTechs.length === 0 ? (
                                    <p className="text-center text-muted py-3 small">
                                        No se encontraron técnicos disponibles.
                                    </p>
                                ) : (
                                    <div className="list-group list-group-flush">
                                        {filteredTechs.map((tech) => (
                                            <button
                                                key={tech.id}
                                                type="button"
                                                className="list-group-item list-group-item-action border-0 rounded-3 d-flex justify-content-between align-items-center mb-2 p-3 bg-light-hover"
                                                onClick={() => onAssign(incident.id, tech.id)}
                                            >
                                                <div className="d-flex flex-column align-items-start">
                                                    <span className="fw-bold text-dark">{tech.name}</span>
                                                    <span
                                                        className="text-muted small"
                                                        style={{ fontSize: "11px" }}
                                                    >
                                                        {tech.email}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`badge rounded-pill px-2 py-1 ${tech.status === "Disponible" ? "bg-success-subtle text-success" : "bg-warning-subtle text-warning"}`}
                                                >
                                                    {tech.status}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <footer className="modal-footer border-0 pb-4 px-4 pt-2">
                            <button
                                type="button"
                                className="btn btn-light w-100 rounded-3 fw-bold py-2"
                                onClick={onClose}
                            >
                                Cancelar
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignTechnicianModal;
