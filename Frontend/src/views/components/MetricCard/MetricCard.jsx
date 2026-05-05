/**
 * MetricCard — Tarjeta reutilizable para métricas del dashboard.
 *
 * @param {string} title - Nombre de la métrica
 * @param {string|number} value - Valor a mostrar
 * @param {string} variant - Color Bootstrap (primary, danger, success, info)
 */

function MetricCard({ title, value, variant = 'primary' }) {
  return (
    <div className="col-6 col-md-3">
      <article className={`card bg-${variant} text-white`} aria-label={`${title}: ${value}`}>
        <div className="card-body">
          <h3 className="card-subtitle h6 mb-2">{title}</h3>
          <p className="card-title display-6 mb-0">{value}</p>
        </div>
      </article>
    </div>
  );
}

export default MetricCard;
