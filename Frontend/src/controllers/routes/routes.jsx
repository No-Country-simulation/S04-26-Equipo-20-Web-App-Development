/**
 * Routes — Definición de rutas de la aplicación.
 */
import AppLayout from '../../views/layouts/AppLayout';
import AuthLayout from '../../views/layouts/AuthLayout';
import LoginPage from '../../views/pages/login/LoginPage';
import RegisterPage from '../../views/pages/register/RegisterPage';
import DashboardPage from '../../views/pages/dashboard/DashboardPage';
import IncidentListPage from '../../views/pages/incidentList/IncidentListPage';
import ReportIncidentPage from '../../views/pages/reportIncident/ReportIncidentPage';
import IncidentDetailPage from '../../views/pages/incidentDetail/IncidentDetailPage';
import RootCausePage from '../../views/pages/reports/ReportsPage';
import UserManagementPage from '../../views/pages/userManagement/UserManagementPage';
import NotFoundPage from '../../views/pages/NotFoundPage';

export const routes = [
  // Rutas públicas (sin navbar)
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  // Rutas protegidas (con navbar)
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/incidents', element: <IncidentListPage /> },
      { path: '/incidents/new', element: <ReportIncidentPage /> },
      { path: '/incidents/:id', element: <IncidentDetailPage /> },
      { path: '/root-cause', element: <RootCausePage /> },
      { path: '/users', element: <UserManagementPage /> },
    ],
  },
  // 404
  { path: '*', element: <NotFoundPage /> },
];
