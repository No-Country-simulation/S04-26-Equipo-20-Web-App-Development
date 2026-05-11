/**
 * Date Formatter — Utilidades de formateo de fechas.
 */

export function formatDate(dateString) {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

export function formatDateTime(dateString) {
  if (!dateString) return '--';
  return new Date(dateString).toLocaleString('es-ES', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

export function timeAgo(dateString) {
  if (!dateString) return '--';
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 60) return 'hace unos segundos';
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`;
  return `hace ${Math.floor(seconds / 86400)} días`;
}
