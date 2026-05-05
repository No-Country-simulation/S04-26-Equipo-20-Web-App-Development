/**
 * Dashboard Page — Panel principal con métricas y KPIs.
 *
 * Semántica: <section> con aria-labelledby, heading hierarchy h1 > h2.
 * DRY: usa MetricCard para evitar repetición de 4 cards idénticas.
 * Responsive: col-6 col-md-3 (2 cards en móvil, 4 en desktop).
 * No inline styles: usa clase .chart-placeholder de bootstrap-overrides.css.
 */

import { useDashboard } from '../../controllers/hooks/useDashboard';
import Spinner from '../components/Spinner/Spinner';
import MetricCard from '../components/MetricCard/MetricCard';

function DashboardPage() {
  const { metrics, loading, error } = useDashboard();

  if (loading) return <Spinner text="Cargando dashboard..." />;

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert" aria-live="polite">
        {error}
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4">📊 Dashboard</h1>

      {/* Métricas principales */}
      <section aria-labelledby="metrics-heading" className="mb-4">
        <h2 id="metrics-heading" className="visually-hidden">Métricas principales</h2>
        <div className="row g-4">
          <MetricCard title="Total Incidentes" value={metrics.totalIncidents} variant="primary" />
          <MetricCard title="Abiertos" value={metrics.openIncidents} variant="danger" />
          <MetricCard title="Resueltos Hoy" value={metrics.resolvedToday} variant="success" />
          <MetricCard title="Tiempo Promedio" value={metrics.avgResolutionTime} variant="info" />
        </div>
      </section>

      {/* Gráficos y KPIs */}
      <section aria-labelledby="charts-heading">
        <h2 id="charts-heading" className="visually-hidden">Gráficos y KPIs</h2>
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title h5">📈 Incidentes por período</h3>
                <div className="bg-light rounded d-flex align-items-center justify-content-center chart-placeholder">
                  <p className="text-muted mb-0">Gráfico de incidentes (integrar Chart.js)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title h5">🎯 KPIs</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tasa de resolución</span>
                    <strong>--%</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Tiempo de respuesta</span>
                    <strong>--h</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Cumplimiento SLA</span>
                    <strong>--%</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Críticos abiertos</span>
                    <strong>--</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
