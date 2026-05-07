/**
 * User Management Page — Gestión de usuarios.
 *
 * Semántica: <section>, th scope, aria-label en botones de acción.
 */

import Spinner from '../../components/Spinner/Spinner';
import { useUserManagementLogic } from './userManagement';

function UserManagementPage() {
  const { users, loading, error } = useUserManagementLogic();

  if (loading) return <Spinner text="Cargando usuarios..." />;

  return (
    <div className="container-fluid py-4">
      {/* Alerta de error no bloqueante */}
      <div aria-live="polite" aria-atomic="true">
        {error && (
          <div className="alert alert-danger mb-4 shadow-sm" role="alert">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>👥 Gestión de Usuarios</h1>
        <button className="btn btn-primary" type="button">➕ Nuevo Usuario</button>
      </div>

      <section aria-labelledby="users-table-heading">
        <h2 id="users-table-heading" className="visually-hidden">Lista de usuarios</h2>
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <caption className="visually-hidden">
                Tabla con {users.length} usuarios registrados
              </caption>
              <thead className="table-dark">
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Email</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">No hay usuarios</td>
                  </tr>
                ) : users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td><span className="badge bg-info">{user.role}</span></td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        type="button"
                        aria-label={`Editar usuario ${user.name}`}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        type="button"
                        aria-label={`Eliminar usuario ${user.name}`}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UserManagementPage;
