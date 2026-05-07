/**
 * Login Page — Página de inicio de sesión.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../controllers/hooks/useAuth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column position-relative"
      style={{ backgroundColor: '#f7f9fb', color: '#191c1e', fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top Navigation Bar */}
      <header className="fixed-top w-100 d-flex align-items-center justify-content-center p-3 mt-3" style={{ backgroundColor: '#f7f9fb', height: '64px' }}>
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-shield-lock-fill fs-3" style={{ color: '#000000' }}></i>
          <h1 className="h4 fw-bold mb-0" style={{ color: '#000000' }}>CoreIncident</h1>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4 position-relative" style={{ marginTop: '64px', zIndex: 1 }}>
        <div
          className="card p-4 rounded-4 shadow-sm border"
          style={{ width: '100%', maxWidth: '448px', backgroundColor: '#ffffff', borderColor: '#c6c6cd' }}
        >
          {/* Branding/Identity */}
          <div className="d-flex flex-column align-items-center text-center gap-2 mb-4">
            <div className="d-inline-flex p-2 rounded-circle mb-2" style={{ backgroundColor: '#d0e1fb' }}>
              <i className="bi bi-lock-fill fs-2" style={{ color: '#54647a' }}></i>
            </div>
            <h2 className="h3 fw-bold mb-1" style={{ color: '#191c1e' }}>Acceso Seguro</h2>
            <p className="mb-0" style={{ color: '#505f76', fontSize: '14px' }}>Ingrese sus credenciales</p>
          </div>

          <div aria-live="polite" aria-atomic="true">
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} noValidate className="d-flex flex-column gap-3">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label fw-medium mb-1 px-1" style={{ color: '#45464d', fontSize: '14px' }}>
                Correo Electrónico
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#76777d' }}>
                  <i className="bi bi-envelope" style={{ color: '#505f76' }}></i>
                </span>
                <input
                  type="email"
                  className="form-control border-start-0 ps-0 shadow-none"
                  id="email"
                  name="email"
                  placeholder="nombre@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderColor: '#76777d', height: '48px', backgroundColor: '#ffffff' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label fw-medium mb-1 px-1" style={{ color: '#45464d', fontSize: '14px' }}>
                Contraseña
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#76777d' }}>
                  <i className="bi bi-key" style={{ color: '#505f76' }}></i>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-start-0 border-end-4 px-0 shadow-none"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderColor: '#76777d', height: '48px', backgroundColor: '#ffffff' }}
                />
                <button
                  className="btn bg-white border border-start-0 shadow-none d-flex align-items-center"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderColor: '#76777d' }}
                >
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} style={{ color: '#505f76' }}></i>
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2 d-flex flex-column gap-3">
              <button
                type="submit"
                className="btn w-100 fw-medium d-flex align-items-center justify-content-center gap-2 border-0"
                disabled={loading}
                style={{ backgroundColor: '#000000', color: '#ffffff', minHeight: '52px', borderRadius: '8px' }}
              >
                <span>{loading ? 'Ingresando...' : 'Iniciar Sesión'}</span>
                {!loading && <i className="bi bi-arrow-right"></i>}
              </button>

              <Link
                to="/forgot-password"
                className="text-center text-decoration-none fw-medium"
                style={{ color: '#505f76', fontSize: '14px' }}
              >
                Recuperar contraseña
              </Link>
            </div>
          </form>

          {/* Secondary Context Section */}
          <div className="mt-4 pt-4 d-flex flex-column align-items-center gap-3 border-top" style={{ borderColor: '#c6c6cd' }}>
            <p className="mb-0" style={{ color: '#505f76', fontSize: '14px' }}>¿Nuevo en CoreIncident?</p>
            <Link
              to="/register"
              className="btn w-100 fw-medium d-flex align-items-center justify-content-center text-decoration-none"
              style={{ minHeight: '48px', border: '1px solid #76777d', color: '#505f76', borderRadius: '8px', backgroundColor: 'transparent' }}
            >
              Registrarse
            </Link>
          </div>
        </div>
      </main>

      {/* Visual Background Element (Subtle Hero/Bento aesthetic) */}
      <div className="position-fixed top-0 start-0 w-100 h-100 pointer-events-none" style={{ zIndex: 0, overflow: 'hidden' }}>
        <div className="position-absolute rounded-circle" style={{ top: 0, right: 0, width: '500px', height: '500px', backgroundColor: 'rgba(208, 225, 251, 0.2)', filter: 'blur(100px)', transform: 'translate(50%, -50%)' }}></div>
        <div className="position-absolute rounded-circle" style={{ bottom: 0, left: 0, width: '400px', height: '400px', backgroundColor: 'rgba(218, 226, 253, 0.1)', filter: 'blur(80px)', transform: 'translate(-50%, 50%)' }}></div>
      </div>

      {/* Footer */}
      <footer className="mt-auto w-100 py-3 px-4 position-relative" style={{ zIndex: 1 }}>
        <div className="container-fluid mx-auto d-flex flex-column flex-md-row justify-content-between align-items-center gap-2" style={{ maxWidth: '1440px' }}>
          <span className="fw-semibold text-center text-md-start" style={{ color: '#505f76', fontSize: '12px' }}>© 2024 CoreIncident. Command and Control Systems.</span>
          <div className="d-flex gap-3 mt-2 mt-md-0">
            <a href="#" className="text-decoration-none fw-semibold" style={{ color: '#505f76', fontSize: '12px' }}>Soporte</a>
            <a href="#" className="text-decoration-none fw-semibold" style={{ color: '#505f76', fontSize: '12px' }}>Privacidad</a>
            <a href="#" className="text-decoration-none fw-semibold" style={{ color: '#505f76', fontSize: '12px' }}>Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginPage;
