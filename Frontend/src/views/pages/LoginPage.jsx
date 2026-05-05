/**
 * Login Page — Página de inicio de sesión.
 *
 * Semántica: <section> con <h1>, autoComplete, aria-live para errores.
 * Bootstrap 5.3: form-label, form-control, alert con role.
 * A11Y: labels asociados, autoComplete, aria-describedby, aria-live.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../controllers/hooks/useAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <section className="container" aria-labelledby="login-heading">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-11 col-sm-8 col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h1 id="login-heading" className="h2 text-center mb-4">⚙️ OpsCore</h1>
              <p className="text-center text-muted mb-4">Inicia sesión para continuar</p>

              <div aria-live="polite" aria-atomic="true">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="login-email" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="login-email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="login-password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    aria-required="true"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
              </form>

              <p className="text-center mt-3 mb-0">
                ¿No tienes cuenta? <Link to="/register">Crear cuenta</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
