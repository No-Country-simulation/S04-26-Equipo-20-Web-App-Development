/**
 * Not Found Page — Página 404.
 *
 * Semántica: <main> como contenedor principal (esta page no tiene layout wrapper).
 */

import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="container text-center py-5">
      <h1 className="display-1 text-muted">404</h1>
      <p className="lead">Página no encontrada</p>
      <Link to="/dashboard" className="btn btn-primary">
        Volver al Dashboard
      </Link>
    </main>
  );
}

export default NotFoundPage;
