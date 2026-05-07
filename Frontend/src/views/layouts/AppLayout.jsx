/**
 * App Layout — Layout principal para usuarios autenticados.
 *
 * Semántica: <header> para top bar, <main> para contenido, y delegación de Bottom Nav a Navbar.
 */

import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: '#f7f9fb', color: '#191c1e', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Top Header */}
      <header 
        className="fixed-top w-100 d-flex align-items-center justify-content-between px-4" 
        style={{ height: '64px', backgroundColor: '#f7f9fb', zIndex: 1050 }}
      >
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-shield-lock-fill fs-3" style={{ color: '#000000' }}></i>
          <h1 className="h4 fw-bold mb-0" style={{ color: '#000000' }}>CoreIncident</h1>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn border-0 p-0 shadow-none" style={{ color: '#505f76' }}>
            <i className="bi bi-bell fs-5"></i>
          </button>
          <div className="rounded-circle overflow-hidden border" style={{ width: '32px', height: '32px', backgroundColor: '#e0e3e5', borderColor: '#c6c6cd' }}>
            <img 
              className="w-100 h-100 object-fit-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAORqiu-zFuVfOVRWGDaKDU_4nupwVVVtkdlDXgnNPp5i022JKYIALzFBpcNSZq3lU6HS3aeD7sicJn5LjizZF7PhZR_g6v-is_g0BMolRmsWZC2s__hVkdwQ-c9TbI7ORaiUomgkRWJskycU1dUomTTWnnR-CbqX-49-PErucbF8Ex6e_X1GRdfqc_EHC1JhTUQP47i6R6ixt6Yloini2Wi_6yWYxTmIxgLdp-aRB0dhLATqjnc_oi7VfqVKkTVSVFYbUzCOrMCAA" 
              alt="Avatar de usuario" 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 w-100 mx-auto" id="main-content" style={{ paddingTop: '80px', paddingBottom: '96px', maxWidth: '1440px', paddingLeft: '24px', paddingRight: '24px' }}>
        <Outlet />
      </main>

      {/* FAB Button */}
      <button 
        className="btn fixed-bottom rounded-circle d-flex align-items-center justify-content-center shadow-lg border-0"
        style={{ width: '56px', height: '56px', backgroundColor: '#131b2e', color: '#ffffff', right: '24px', bottom: '96px', left: 'auto', zIndex: 1060 }}
        onClick={() => navigate('/incidents/new')}
        title="Reportar Incidente"
      >
        <i className="bi bi-plus fs-1"></i>
      </button>

      {/* Bottom Navbar */}
      <Navbar />

    </div>
  );
}

export default AppLayout;
