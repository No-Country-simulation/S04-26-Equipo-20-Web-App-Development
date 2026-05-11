/**
 * App Context — Estado global de la aplicación.
 * 
 * Combina todos los providers en uno solo para simplificar el árbol.
 */

import { AuthProvider } from './AuthContext';
import { IncidentProvider } from './IncidentContext';

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <IncidentProvider>
        {children}
      </IncidentProvider>
    </AuthProvider>
  );
}

export default AppProviders;
