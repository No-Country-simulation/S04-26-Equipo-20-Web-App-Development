/**
 * Mobile Layout — Layout optimizado para dispositivos móviles.
 */
import { Outlet } from 'react-router-dom';

function MobileLayout() {
  return (
    <div className="container-fluid px-2 min-vh-100">
      <Outlet />
    </div>
  );
}

export default MobileLayout;
