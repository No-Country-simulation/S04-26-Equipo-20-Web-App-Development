import { useState } from "react";

const UserRegistrationModal = ({ isOpen, onClose, onRegister }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "TECHNICIAN", // Rol por defecto según la base de datos
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Limpiar error del campo cuando el usuario escribe
        if (errors[name]) setErrors({ ...errors, [name]: "" });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
        if (!formData.email.trim()) {
            newErrors.email = "El correo es requerido";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Correo electrónico no válido";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onRegister(formData);
            // Limpiar formulario tras registro exitoso
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "",
                role: "TECHNICIAN",
            });
        }
    };

    return (
        <>
            {/* Fondo oscuro detrás del modal */}
            <div className="modal-backdrop fade show" onClick={onClose}></div>

            <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content border-0 rounded-4 shadow-lg">
                        <header className="modal-header border-0 pt-4 px-4 pb-2 d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="modal-title fw-bold">Registrar Nuevo Usuario</h5>
                                <p className="text-muted small mb-0">
                                    Completa los accesos para el personal.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn-close shadow-none"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                        </header>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body px-4">
                                {/* Nombre Completo */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control rounded-3 shadow-sm ${errors.name ? "is-invalid" : ""}`}
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Ej. Juan Pérez"
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>

                                {/* Correo Electrónico */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control rounded-3 shadow-sm ${errors.email ? "is-invalid" : ""}`}
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="usuario@opscore.com"
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">
                                        Teléfono (Opcional)
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control rounded-3 shadow-sm"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="809-555-5555"
                                    />
                                </div>

                                {/* Contraseña con Toggle Ojo */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">
                                        Contraseña Temporal
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control rounded-start-3 shadow-sm ${errors.password ? "is-invalid" : ""}`}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="******"
                                        />
                                        <button
                                            className="btn btn-outline-secondary rounded-end-3"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i
                                                className={`bi ${showPassword ? "bi-eye-slash-fill" : "bi-eye-fill"}`}
                                            ></i>
                                        </button>
                                        {errors.password && (
                                            <div className="invalid-feedback d-block">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Selección de Rol */}
                                <div className="mb-4">
                                    <label className="form-label small fw-semibold text-secondary">
                                        Rol en el Sistema
                                    </label>
                                    <select
                                        className="form-select rounded-3 shadow-sm"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="ADMIN">Administrador</option>
                                        <option value="SUPERVISOR">Supervisor</option>
                                        <option value="TECHNICIAN">Técnico</option>
                                        <option value="OPERATOR">Operador</option>
                                    </select>
                                </div>
                            </div>

                            <footer className="modal-footer border-0 pb-4 px-4 pt-2 d-flex gap-2">
                                <button
                                    type="button"
                                    className="btn btn-light flex-fill rounded-3 fw-bold py-2"
                                    onClick={onClose}
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-fill rounded-3 fw-bold py-2"
                                >
                                    Guardar Usuario
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRegistrationModal;
