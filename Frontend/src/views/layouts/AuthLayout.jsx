/**
 * Auth Layout — Layout para páginas de autenticación (sin navbar).
 *
 * Semántica: <main> como contenedor principal del contenido.
 */

import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <main className="bg-light min-vh-100">
      <Outlet />
    </main>
  );
}

export default AuthLayout;
