/**
 * Spinner — Componente de carga reutilizable.
 */

function Spinner({ text = 'Cargando...' }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center py-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="mt-2 text-muted">{text}</p>
    </div>
  );
}

export default Spinner;
