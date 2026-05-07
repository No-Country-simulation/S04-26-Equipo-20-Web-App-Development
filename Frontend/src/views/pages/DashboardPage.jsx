/**
 * Dashboard Page — Panel principal con métricas y KPIs.
 */

import { useDashboard } from '../../controllers/hooks/useDashboard';
import MetricCard from '../components/MetricCard/MetricCard';

function DashboardPage() {
  const { metrics, loading, error } = useDashboard();

  // Variables por defecto si no hay data (para pintar el dashboard sin importar el error)
  const data = metrics || {
    totalIncidents: 0,
    openIncidents: 0,
    resolvedToday: 0
  };

  return (
    <div className="py-4">
      {error && (
        <div className="alert border-0 rounded-4 mb-4 d-flex align-items-center gap-2 shadow-sm" role="alert" aria-live="polite" style={{ backgroundColor: '#ffdad6', color: '#93000a' }}>
          <i className="bi bi-exclamation-triangle-fill fs-5"></i>
          <span className="fw-medium">{error} (Mostrando vista fuera de línea)</span>
        </div>
      )}

      {loading && !error && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" style={{ color: '#000000' }} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* Métricas principales */}
      <section aria-labelledby="metrics-heading" className="mb-5">
        <h2 id="metrics-heading" className="h5 fw-bold mb-3" style={{ color: '#191c1e' }}>Estado del Sistema</h2>
        <div className="row g-4">
          <MetricCard title="Incidentes Totales" value={data.totalIncidents} icon="bi-bar-chart-fill" colorScheme="primary" />
          <MetricCard title="Pendientes" value={data.openIncidents} icon="bi-exclamation-triangle-fill" colorScheme="error" />
          <MetricCard title="Resueltos" value={data.resolvedToday} icon="bi-check-circle-fill" colorScheme="secondary" />
        </div>
      </section>

      {/* Actividad Reciente */}
      <section aria-labelledby="activity-heading" className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 id="activity-heading" className="h5 fw-bold mb-0" style={{ color: '#191c1e' }}>Actividad Reciente</h2>
          <button className="btn btn-link text-decoration-none fw-medium p-0 shadow-none" style={{ color: '#000000', fontSize: '14px' }}>Ver todo</button>
        </div>
        
        <div className="rounded-4 overflow-hidden border bg-white" style={{ borderColor: '#e0e3e5', boxShadow: '0 4px 6px -1px rgba(19, 27, 46, 0.05)' }}>
          <div className="d-flex flex-column">
            
            {/* Elementos de Actividad - Demo Visual */}
            <div className="d-flex align-items-center gap-3 p-4 border-bottom" style={{ borderColor: '#e0e3e5', cursor: 'pointer' }}>
              <div className="position-relative">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#eceef0', color: '#000000' }}>
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <div className="position-absolute rounded-circle border border-2 border-white" style={{ top: '-4px', right: '-4px', width: '12px', height: '12px', backgroundColor: '#ba1a1a' }}></div>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-semibold" style={{ color: '#191c1e', fontSize: '16px' }}>Incidente #1234 reportado</p>
                <p className="mb-0" style={{ color: '#505f76', fontSize: '14px' }}>Zona Norte • Hace 5 min</p>
              </div>
              <i className="bi bi-chevron-right" style={{ color: '#505f76' }}></i>
            </div>

            <div className="d-flex align-items-center gap-3 p-4 border-bottom" style={{ borderColor: '#e0e3e5', cursor: 'pointer' }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#dbe1ff', color: '#003ea8' }}>
                <i className="bi bi-fire"></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-semibold" style={{ color: '#191c1e', fontSize: '16px' }}>Fuego en Sector B resuelto</p>
                <p className="mb-0" style={{ color: '#505f76', fontSize: '14px' }}>Departamento Técnico • Hace 42 min</p>
              </div>
              <i className="bi bi-chevron-right" style={{ color: '#505f76' }}></i>
            </div>

            <div className="d-flex align-items-center gap-3 p-4" style={{ cursor: 'pointer' }}>
              <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', backgroundColor: '#dae2fd', color: '#3f465c' }}>
                <i className="bi bi-shield-check"></i>
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-semibold" style={{ color: '#191c1e', fontSize: '16px' }}>Protocolo de seguridad actualizado</p>
                <p className="mb-0" style={{ color: '#505f76', fontSize: '14px' }}>Admin • Hace 4 horas</p>
              </div>
              <i className="bi bi-chevron-right" style={{ color: '#505f76' }}></i>
            </div>

          </div>
        </div>
      </section>

      {/* Mapa de Incidentes */}
      <section aria-labelledby="map-heading" className="mb-4">
        <h2 id="map-heading" className="visually-hidden">Mapa de Incidentes</h2>
        <div className="position-relative w-100 rounded-4 overflow-hidden border" style={{ height: '192px', borderColor: '#e0e3e5', boxShadow: '0 4px 6px -1px rgba(19, 27, 46, 0.05)' }}>
          <img 
            className="w-100 h-100 object-fit-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ybKlqWe0ZaMKG1JJXLDdEgdIVjyL1SUcI-Nl7tGZjYvVwJ57fRhh31c3apMGkT7jPjGfmezGbdafsBVHXV4jYHVuWemVSeuYOKMZTYYGIpCYM1RElpisdv9lgBTNvRM8JgbU6ehz1Dzca697284BeERusY56wWs4ePkhdhA_PgeBcuWDIU_zlofT7L5aitCKQ4Hhhzr6k0CpZdw-iUAUbamA1F7yypE0WGHECi_KueXKvXdvq92wiCesDvH37YYC9kqEbeLgit8" 
            alt="Mapa de Incidentes" 
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end p-4" style={{ background: 'linear-gradient(to top, rgba(19, 27, 46, 0.6), transparent)' }}>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="text-white">
                <h3 className="h5 fw-bold mb-0">Mapa de Incidentes</h3>
                <p className="mb-0 opacity-75" style={{ fontSize: '14px' }}>3 focos activos detectados</p>
              </div>
              <button className="btn rounded-pill border-0 fw-medium px-3 py-1" style={{ backgroundColor: '#ffffff', color: '#000000', fontSize: '14px' }}>
                Expandir
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default DashboardPage;
