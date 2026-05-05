/**
 * App Layout — Layout principal para usuarios autenticados.
 *
 * Semántica: <header> para navbar, <main> para contenido, <footer> para pie.
 */

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function AppLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow-1 bg-light" id="main-content">
        <Outlet />
      </main>
      <footer className="bg-dark text-light text-center py-2">
        <small>© 2026 OpsCore — Sistema de Gestión de Incidentes</small>
      </footer>
    </div>
  );
}

export default AppLayout;
