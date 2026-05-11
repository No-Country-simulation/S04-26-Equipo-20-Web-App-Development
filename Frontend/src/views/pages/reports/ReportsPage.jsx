/**
 * Reports Page — Dashboard de reportes.
 */

import Spinner from '../../components/Spinner/Spinner';
import { useRootCauseLogic } from './rootCause';

function ReportsPage() {
  const { loading, error } = useRootCauseLogic();

  if (loading) {
    return <Spinner text="Cargando reportes..." />;
  }

  return (
    <main className="bg-light min-vh-100 d-flex flex-column">

      {/* CONTENIDO */}
      <div className="container-fluid px-3 py-4 flex-grow-1">

        {/* ERROR */}
        <div aria-live="polite" aria-atomic="true">
          {error && (
            <div className="alert alert-danger shadow-sm mb-4" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
        </div>

        {/* PERIODO */}
        <section
          aria-labelledby="analysis-period-heading"
          className="card border-0 shadow-sm rounded-4 mb-4"
        >
          <div className="card-body p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h2
                  id="analysis-period-heading"
                  className="small text-secondary mb-1 fw-normal"
                >
                  Periodo de análisis
                </h2>

                <p className="fw-bold fs-4 mb-0">
                  Últimos 7 días
                </p>
              </div>

              <button
                type="button"
                className="btn btn-light rounded-3 px-3 py-2 border"
              >
                <i className="bi bi-calendar-event me-2"></i>
                Cambiar
              </button>
            </div>
          </div>
        </section>

        {/* METRICAS */}
        <section
          aria-labelledby="metrics-heading"
          className="mb-4"
        >
          <h2 id="metrics-heading" className="visually-hidden">
            Métricas principales
          </h2>

          <div className="row g-3">

            {/* CARD 1 */}
            <div className="col-6">
              <article className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-3">

                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-stopwatch text-secondary"></i>

                    <span className="text-secondary small fw-semibold">
                      Tiempo Resp.
                    </span>
                  </div>

                  <h3 className="display-5 fw-bold mb-3">
                    18m
                  </h3>

                  <p className="text-danger small fw-semibold mb-0">
                    ↗ 12% vs mes ant.
                  </p>
                </div>
              </article>
            </div>

            {/* CARD 2 */}
            <div className="col-6">
              <article className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-3">

                  <div className="d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-check-circle text-secondary"></i>

                    <span className="text-secondary small fw-semibold">
                      % Resolución
                    </span>
                  </div>

                  <h3 className="display-5 fw-bold mb-3">
                    94.2%
                  </h3>

                  <p className="small fw-semibold mb-0 text-dark">
                    → Estable
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* GRAFICO */}
        <section
          aria-labelledby="status-chart-heading"
          className="card border-0 shadow-sm rounded-4 mb-4"
        >
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-start mb-4">
              <h2
                id="status-chart-heading"
                className="fw-bold fs-1 mb-0"
              >
                Incidentes por Estado
              </h2>

              <button
                type="button"
                className="btn border-0 p-0"
                aria-label="Más opciones"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>

            {/* Placeholder gráfico */}
            <div
              className="w-100 rounded-4 mb-4"
              style={{
                height: '240px',
                backgroundColor: '#f5f5f5'
              }}
            ></div>

            {/* Labels */}
            <div className="d-flex justify-content-around text-center">
              <span>Abiertos</span>
              <span>Proceso</span>
              <span>Resueltos</span>
              <span>Cerrados</span>
            </div>
          </div>
        </section>

        {/* INCIDENTES */}
        <section
          aria-labelledby="critical-incidents-heading"
          className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4"
        >
          <header className="card-header bg-white border-bottom py-4 px-4">
            <div className="d-flex align-items-center justify-content-between">

              <h2
                id="critical-incidents-heading"
                className="fw-bold mb-0"
              >
                Incidentes Críticos
              </h2>

              <button
                type="button"
                className="btn btn-link text-decoration-none p-0"
              >
                Ver todos
              </button>
            </div>
          </header>

          <div className="list-group list-group-flush">

            {/* ITEM */}
            <article className="list-group-item py-4 px-4">
              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <h3 className="fw-bold fs-4 mb-1">
                    ID-2849: Falla Servidor
                  </h3>

                  <p className="text-secondary mb-0">
                    TI / Infraestructura
                  </p>
                </div>

                <div className="text-end">
                  <span className="badge rounded-pill text-danger bg-danger-subtle px-3 py-2 mb-2">
                    CRÍTICO
                  </span>

                  <p className="mb-0 text-secondary">
                    Hace 2h
                  </p>
                </div>
              </div>
            </article>

            {/* ITEM */}
            <article className="list-group-item py-4 px-4">
              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <h3 className="fw-bold fs-4 mb-1">
                    ID-2852: Fuga Seguridad
                  </h3>

                  <p className="text-secondary mb-0">
                    Seguridad Física
                  </p>
                </div>

                <div className="text-end">
                  <span className="badge rounded-pill text-danger bg-danger-subtle px-3 py-2 mb-2">
                    CRÍTICO
                  </span>

                  <p className="mb-0 text-secondary">
                    Hace 5h
                  </p>
                </div>
              </div>
            </article>

            {/* ITEM */}
            <article className="list-group-item py-4 px-4">
              <div className="d-flex justify-content-between align-items-start">

                <div>
                  <h3 className="fw-bold fs-4 mb-1">
                    ID-2855: Corte Eléctrico
                  </h3>

                  <p className="text-secondary mb-0">
                    Mantenimiento
                  </p>
                </div>

                <div className="text-end">
                  <span className="badge rounded-pill text-primary bg-primary-subtle px-3 py-2 mb-2">
                    ALTO
                  </span>

                  <p className="mb-0 text-secondary">
                    Hace 12h
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* CARDS */}
        <section
          aria-labelledby="summary-cards-heading"
          className="mb-4"
        >
          <h2
            id="summary-cards-heading"
            className="visually-hidden"
          >
            Resumen operativo
          </h2>

          {/* OPERACIONES */}
          <article className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-4">

                <div
                  className="bg-black rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ width: '64px', height: '64px' }}
                >
                  <i className="bi bi-people-fill fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-1">
                    Operaciones
                  </h3>

                  <p className="text-secondary mb-0">
                    12 agentes activos hoy
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* EFICIENCIA */}
          <article className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4">

              <div className="d-flex align-items-center gap-4">

                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#5b6b8a'
                  }}
                >
                  <i className="bi bi-bar-chart-line-fill fs-4"></i>
                </div>

                <div>
                  <h3 className="fw-bold mb-1">
                    Eficiencia
                  </h3>

                  <p className="text-secondary mb-0">
                    +8% mejora este mes
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* HERO */}
        <section
          aria-labelledby="strategic-summary-heading"
          className="mb-5"
        >
          <article
            className="position-relative overflow-hidden rounded-4 shadow-sm"
            style={{ height: '220px' }}
          >

            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
              alt="Dashboard estratégico"
              className="w-100 h-100 object-fit-cover"
            />

            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,.75), rgba(0,0,0,.15))'
              }}
            ></div>

            <div className="position-absolute bottom-0 start-0 p-4 text-white">

              <h2
                id="strategic-summary-heading"
                className="fw-bold display-6 mb-2"
              >
                Resumen Estratégico
              </h2>

              <p className="mb-0 fs-5">
                Generado automáticamente para el equipo directivo.
              </p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default ReportsPage;