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
     <div className="bg-light min-vh-100">

      {/* MAIN CONTENT */}
      <main className="container py-4">

        {/* ERROR ALERT */}
        <section
          aria-live="polite"
          aria-atomic="true"
        >
          {error && (
            <div
              className="alert alert-danger shadow-sm"
              role="alert"
            >
              {error}
            </div>
          )}
        </section>

        {/* PAGE TITLE */}
        <section
          className="mb-4"
          aria-labelledby="page-title"
        >
          <h2
            id="page-title"
            className="display-4 fw-bold"
          >
            Gestión de Usuarios
          </h2>
        </section>

        {/* SEARCH SECTION */}
        <section
          className="d-flex gap-2 mb-4"
          aria-labelledby="search-users-title"
        >

          <h3
            id="search-users-title"
            className="visually-hidden"
          >
            Buscar usuarios
          </h3>

          {/* SEARCH FORM */}
          <form
            className="flex-grow-1"
            role="search"
          >
            <label
              htmlFor="search-users"
              className="visually-hidden"
            >
              Buscar usuario por nombre o email
            </label>

            <div className="input-group input-group-lg">

              <span
                className="input-group-text bg-white border-end-0 rounded-start-4"
                aria-hidden="true"
              >
                <i className="bi bi-search text-secondary"></i>
              </span>

              <input
                id="search-users"
                type="search"
                className="form-control border-start-0 rounded-end-4"
                placeholder="Buscar por nombre o email..."
              />

            </div>
          </form>

          {/* CREATE USER */}
          <button
            type="button"
            className="btn btn-dark rounded-4 px-3"
            aria-label="Crear nuevo usuario"
          >
            <i
              className="bi bi-person-plus fs-4"
              aria-hidden="true"
            ></i>
          </button>

        </section>

        {/* STATS */}
        <section
          className="row g-3 mb-4"
          aria-labelledby="statistics-title"
        >

          <h3
            id="statistics-title"
            className="visually-hidden"
          >
            Estadísticas de usuarios
          </h3>

          {/* TOTAL USERS */}
          <article className="col-6">
            <div className="card border rounded-4 h-100">
              <div className="card-body">

                <h4 className="text-secondary fs-6">
                  Total Usuarios
                </h4>

                <p className="fw-bold display-6 mb-0">
                  1,284
                </p>

              </div>
            </div>
          </article>

          {/* SUPER ADMINS */}
          <article className="col-6">
            <div className="card border rounded-4 h-100">
              <div className="card-body">

                <h4 className="text-secondary fs-6">
                  SuperAdmins
                </h4>

                <p className="fw-bold display-6 mb-0">
                  12
                </p>

              </div>
            </div>
          </article>

          {/* ACTIVE USERS */}
          <article className="col-6">
            <div className="card border rounded-4 h-100">
              <div className="card-body">

                <h4 className="text-secondary fs-6">
                  Activos Ahora
                </h4>

                <p className="fw-bold display-6 mb-0 d-flex align-items-center gap-2">

                  <span
                    className="bg-success rounded-circle d-inline-block"
                    style={{
                      width: '10px',
                      height: '10px'
                    }}
                    aria-hidden="true"
                  ></span>

                  <span>45</span>

                </p>

              </div>
            </div>
          </article>

          {/* PENDING */}
          <article className="col-6">
            <div className="card border rounded-4 h-100">
              <div className="card-body">

                <h4 className="text-secondary fs-6">
                  Pendientes
                </h4>

                <p className="fw-bold display-6 mb-0">
                  8
                </p>

              </div>
            </div>
          </article>

        </section>

        {/* USERS LIST */}
        <section
          className="card border rounded-4 overflow-hidden"
          aria-labelledby="users-list-title"
        >

          <h3
            id="users-list-title"
            className="visually-hidden"
          >
            Lista de usuarios
          </h3>

          {users.length === 0 ? (
            <p className="p-5 text-center text-secondary mb-0">
              No hay usuarios registrados
            </p>
          ) : (
            <>
              {users.map((user, index) => (
                <article
                  key={user.id}
                  className={`p-4 ${
                    index !== users.length - 1
                      ? 'border-bottom'
                      : ''
                  }`}
                >

                  <div className="d-flex justify-content-between align-items-start">

                    {/* USER INFO */}
                    <div className="d-flex gap-3">

                      {/* USER AVATAR */}
                      <img
                        src={
                          user.avatar ||
                          'https://i.pravatar.cc/150?img=12'
                        }
                        alt={`Avatar de ${user.name}`}
                        className="rounded-circle object-fit-cover"
                        width="60"
                        height="60"
                      />

                      {/* USER DATA */}
                      <div>

                        <h4 className="fw-bold fs-3 mb-1">
                          {user.name}
                        </h4>

                        <p className="text-secondary fs-4 mb-3">
                          {user.email}
                        </p>

                        {/* USER TAGS */}
                        <ul className="list-unstyled d-flex gap-2 flex-wrap mb-0">

                          <li>
                            <span className="badge rounded-pill text-dark bg-light px-3 py-2 fs-6 fw-normal">
                              {user.role}
                            </span>
                          </li>

                          <li>
                            <span
                              className={`badge rounded-pill px-3 py-2 fs-6 fw-normal ${
                                user.status === 'Inactivo'
                                  ? 'bg-secondary-subtle text-dark'
                                  : 'bg-success-subtle text-success'
                              }`}
                            >
                              {user.status || 'Activo'}
                            </span>
                          </li>

                        </ul>

                      </div>

                    </div>

                    {/* OPTIONS */}
                    <button
                      type="button"
                      className="btn border-0 p-0"
                      aria-label={`Abrir opciones para ${user.name}`}
                    >
                      <i
                        className="bi bi-three-dots-vertical fs-4"
                        aria-hidden="true"
                      ></i>
                    </button>

                  </div>

                </article>
              ))}

              {/* PAGINATION */}
              <footer className="border-top p-4 bg-light">

                <div className="d-flex justify-content-between align-items-center">

                  <p className="mb-0 fs-5">
                    Mostrando 4 de 1,284 usuarios
                  </p>

                  <nav
                    aria-label="Paginación de usuarios"
                  >
                    <ul className="list-unstyled d-flex gap-2 mb-0">

                      <li>
                        <button
                          type="button"
                          className="btn btn-light border rounded-4"
                          aria-label="Página anterior"
                        >
                          <i
                            className="bi bi-chevron-left"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </li>

                      <li>
                        <button
                          type="button"
                          className="btn btn-light border rounded-4"
                          aria-label="Página siguiente"
                        >
                          <i
                            className="bi bi-chevron-right"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </li>

                    </ul>
                  </nav>

                </div>

              </footer>
            </>
          )}

        </section>

      </main>

      {/* BOTTOM NAVIGATION */}
      <nav
        className="navbar bg-white border-top fixed-bottom py-2"
        aria-label="Navegación principal"
      >

        <ul className="container list-unstyled d-flex justify-content-around align-items-center text-center mb-0">

          <li>
            <button
              type="button"
              className="btn border-0"
              aria-label="Ir a Home"
            >
              <span className="d-flex flex-column align-items-center">

                <i
                  className="bi bi-house fs-4"
                  aria-hidden="true"
                ></i>

                <span className="small">
                  Home
                </span>

              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="btn border-0"
              aria-label="Ir a Incidentes"
            >
              <span className="d-flex flex-column align-items-center">

                <i
                  className="bi bi-clipboard-check fs-4"
                  aria-hidden="true"
                ></i>

                <span className="small">
                  Incidentes
                </span>

              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="btn border-0"
              aria-label="Ir a Reportes"
            >
              <span className="d-flex flex-column align-items-center">

                <i
                  className="bi bi-bar-chart fs-4"
                  aria-hidden="true"
                ></i>

                <span className="small">
                  Reportes
                </span>

              </span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className="btn bg-primary-subtle rounded-4 px-3"
              aria-current="page"
              aria-label="Página actual: Ajustes"
            >
              <span className="d-flex flex-column align-items-center">

                <i
                  className="bi bi-gear fs-4"
                  aria-hidden="true"
                ></i>

                <span className="small">
                  Ajustes
                </span>

              </span>
            </button>
          </li>

        </ul>

      </nav>

    </div>
  );
}

export default UserManagementPage;
