/**
 * Register Page — Página de registro de nuevos usuarios.
 *
 * Semántica: <section> con <h1>, autoComplete, aria-live, feedback visual.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../controllers/hooks/useAuth';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
    register(formData);
  };

  return (
    <section className="container" aria-labelledby="register-heading">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 id="register-heading" className="h2 text-center mb-4">⚙️ Crear Cuenta</h1>

              <div aria-live="polite" aria-atomic="true">
                {error && (
                  <div className="alert alert-danger" role="alert">{error}</div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="register-name" className="form-label">Nombre completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="register-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className={`form-control${passwordError ? ' is-invalid' : ''}`}
                    id="register-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    aria-required="true"
                    minLength={6}
                    aria-describedby="password-help"
                  />
                  <div id="password-help" className="form-text">Mínimo 6 caracteres.</div>
                </div>

                <div className="mb-3">
                  <label htmlFor="register-confirm" className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className={`form-control${passwordError ? ' is-invalid' : ''}`}
                    id="register-confirm"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    aria-required="true"
                    aria-describedby="confirm-error"
                  />
                  {passwordError && (
                    <div id="confirm-error" className="invalid-feedback" role="alert">
                      {passwordError}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading} aria-busy={loading}>
                  {loading ? 'Registrando...' : 'Crear Cuenta'}
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
