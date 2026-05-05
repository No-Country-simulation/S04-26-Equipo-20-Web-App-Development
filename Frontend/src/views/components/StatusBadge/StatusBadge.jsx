/**
 * StatusBadge — Muestra el estado de un incidente con color.
 */

const STATUS_STYLES = {
  open: { className: 'bg-danger', label: 'Abierto' },
  in_progress: { className: 'bg-warning text-dark', label: 'En Progreso' },
  resolved: { className: 'bg-success', label: 'Resuelto' },
  closed: { className: 'bg-secondary', label: 'Cerrado' },
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.open;

  return (
    <span className={`badge ${style.className}`}>
      {style.label}
    </span>
  );
}

export default StatusBadge;
