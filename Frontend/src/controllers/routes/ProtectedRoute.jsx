/**
 * ProtectedRoute — Wrapper para rutas que requieren autenticación.
 */
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../models/store/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
