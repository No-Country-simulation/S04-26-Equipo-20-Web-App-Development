/**
 * App.jsx — Componente raíz de OpsCore.
 * Integra el Router con los Providers (MVC: punto de ensamble).
 */

import { RouterProvider } from 'react-router-dom';
import { AppProviders } from './models/store/AppContext';
import router from './controllers/routes/router';

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
