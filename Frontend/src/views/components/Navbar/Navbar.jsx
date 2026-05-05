/**
 * Navbar — Barra de navegación principal de OpsCore.
 *
 * Semántica: <nav aria-label> con NavLink para active state automático.
 * Bootstrap 5.3: navbar-expand-lg, bg-body-tertiary, aria-current.
 * React Router: NavLink con className callback para active styling.
 */

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../controllers/hooks/useAuth';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/incidents', label: 'Incidentes', icon: '🔔' },
  { to: '/incidents/new', label: 'Reportar', icon: '➕' },
  { to: '/root-cause', label: 'Análisis de Causas', icon: '🔍' },
  { to: '/users', label: 'Usuarios', icon: '👥' },
];

function Navbar() {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Navegación principal">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          ⚙️ OpsCore
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {NAV_ITEMS.map(({ to, label, icon }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={navLinkClass}
                  to={to}
                  aria-current={({ isActive }) => isActive ? 'page' : undefined}
                >
                  {icon} {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center">
            <span className="text-light me-3" aria-label="Usuario actual">
              👤 {user?.name || 'Usuario'}
            </span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={logout}
              type="button"
              aria-label="Cerrar sesión"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
