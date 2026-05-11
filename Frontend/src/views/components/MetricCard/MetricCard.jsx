/**
 * MetricCard — Tarjeta reutilizable para métricas del dashboard.
 *
 * @param {string} title - Nombre de la métrica
 * @param {string|number} value - Valor a mostrar
 * @param {string} icon - Ícono de Bootstrap Icons
 * @param {string} colorScheme - Esquema de colores ('primary', 'error', 'secondary')
 */

function MetricCard({ title, value, icon, colorScheme = 'primary' }) {
  const colors = {
    primary: { bgContainer: '#dae2fd', text: '#131b2e', valueColor: '#000000' },
    error: { bgContainer: '#ffdad6', text: '#93000a', valueColor: '#ba1a1a' },
    secondary: { bgContainer: '#d0e1fb', text: '#54647a', valueColor: '#505f76' }
  };
  
  const theme = colors[colorScheme] || colors.primary;

  return (
    <div className="col-12 col-md-4">
      <div 
        className="p-4 rounded-4 d-flex align-items-center gap-4 border"
        style={{ backgroundColor: '#ffffff', borderColor: '#e0e3e5', boxShadow: '0 4px 6px -1px rgba(19, 27, 46, 0.05), 0 2px 4px -1px rgba(19, 27, 46, 0.03)' }}
      >
        <div 
          className="p-3 rounded-3 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: theme.bgContainer, color: theme.text, width: '64px', height: '64px' }}
        >
          <i className={`bi ${icon} fs-2`}></i>
        </div>
        <div>
          <p className="mb-0 fw-medium" style={{ color: '#505f76', fontSize: '14px', letterSpacing: '0.01em' }}>{title}</p>
          <p className="mb-0 fw-bold lh-sm" style={{ fontSize: '32px', color: theme.valueColor, letterSpacing: '-0.01em' }}>{value}</p>
        </div>
      </div>
    </div>
  );
}

export default MetricCard;
