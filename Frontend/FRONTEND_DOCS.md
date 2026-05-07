# 📖 Documentación Frontend — OpsCore

> **Última actualización:** Mayo 2026
> **Stack:** React 19 + Vite 8 + Bootstrap 5 + React Router 7 + Bootstrap Icons
> **Arquitectura:** MVC (Modelo-Vista-Controlador)

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura MVC](#arquitectura-mvc)
3. [Estructura de Carpetas](#estructura-de-carpetas)
4. [Capas del Sistema](#capas-del-sistema)
5. [Flujo de Datos](#flujo-de-datos)
6. [Guía para Nuevos Desarrolladores](#guía-para-nuevos-desarrolladores)
7. [Convenciones y Reglas](#convenciones-y-reglas)
8. [Sistema de Diseño y UI](#sistema-de-diseño-y-ui)
9. [Rutas de la Aplicación](#rutas-de-la-aplicación)
10. [Variables de Entorno](#variables-de-entorno)
11. [Scripts Disponibles](#scripts-disponibles)

---

## Descripción General

OpsCore es un **sistema de gestión de incidentes operacionales** compuesto por:

- **Dashboard** con métricas y KPIs en tiempo real
- **Gestión de incidentes** (crear, listar, ver detalle, eliminar)
- **Análisis de causas raíz** con filtros y tablas
- **Gestión de usuarios** con roles (admin, supervisor, operador)
- **Autenticación** con JWT (login, registro, logout)

---

## Arquitectura MVC

Usamos el patrón **Modelo-Vista-Controlador** adaptado a React:

```
┌──────────────────────────────────────────────────────┐
│                      USUARIO                         │
└────────────────────────┬─────────────────────────────┘
                         │ interacciones (click, submit)
                         ▼
┌──────────────────────────────────────────────────────┐
│                  CONTROLLER                          │
│      hooks/ → useAuth, useIncidents, useDashboard    │
│      handlers/ → lógica de eventos                   │
│      routes/ → navegación y rutas                    │
└────────┬─────────────────────────────┬───────────────┘
         │ pide/actualiza datos        │ pasa datos
         ▼                             ▼
┌─────────────────────────┐  ┌─────────────────────────┐
│        MODEL            │  │         VIEW             │
│  services/ → API calls  │  │  pages/ → páginas        │
│  store/ → Contexts      │  │  components/ → UI pura   │
│  schemas/ → validación  │  │  layouts/ → estructuras  │
└─────────────────────────┘  └─────────────────────────┘
```

### ¿Por qué MVC?

| Beneficio | Descripción |
|-----------|-------------|
| **Separación clara** | Cada capa tiene una responsabilidad única |
| **Fácil de testear** | Services y hooks se prueban independientemente |
| **Familiar** | Patrón conocido por devs backend (Node, Java, etc.) |
| **Mantenible** | Cambios en API no afectan la UI y viceversa |

---

## Estructura de Carpetas

```
src/
├── models/                      # 🔷 MODELO — datos y estado
│   ├── services/                #   Llamadas HTTP al backend
│   │   ├── apiClient.js         #   Cliente HTTP base (fetch + auth)
│   │   ├── authService.js       #   Login, register, logout
│   │   ├── incidentService.js   #   CRUD de incidentes
│   │   ├── dashboardService.js  #   Métricas y KPIs
│   │   ├── rootCauseService.js  #   Análisis de causas
│   │   └── userService.js       #   CRUD de usuarios
│   ├── store/                   #   Estado global (Context API)
│   │   ├── AuthContext.jsx      #   Autenticación (user, token)
│   │   ├── IncidentContext.jsx  #   Lista de incidentes
│   │   └── AppContext.jsx       #   Provider combinado
│   └── schemas/                 #   Validaciones y constantes
│       ├── incidentSchema.js    #   Enums, validación de incidentes
│       ├── userSchema.js        #   Roles, validación de usuarios
│       └── dashboardSchema.js   #   Estructura de métricas
│
├── views/                       # 🟢 VISTA — presentación
│   ├── components/              #   Componentes reutilizables
│   │   ├── Navbar/Navbar.jsx    #   Barra de navegación
│   │   ├── Spinner/Spinner.jsx  #   Indicador de carga
│   │   └── StatusBadge/         #   Badge de estado de incidente
│   ├── pages/                   #   Páginas (una por ruta)
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── IncidentListPage.jsx
│   │   ├── ReportIncidentPage.jsx
│   │   ├── IncidentDetailPage.jsx
│   │   ├── RootCausePage.jsx
│   │   ├── UserManagementPage.jsx
│   │   └── NotFoundPage.jsx
│   └── layouts/                 #   Estructuras de página
│       ├── AppLayout.jsx        #   Con Navbar (rutas autenticadas)
│       ├── AuthLayout.jsx       #   Sin Navbar (login/register)
│       └── MobileLayout.jsx     #   Optimizado para móvil
│
├── controllers/                 # 🔶 CONTROLADOR — lógica
│   ├── hooks/                   #   Custom hooks
│   │   ├── useAuth.js           #   Login, logout, register
│   │   ├── useIncidents.js      #   CRUD + validación incidentes
│   │   ├── useDashboard.js      #   Cargar métricas
│   │   ├── useRootCause.js      #   Análisis de causas
│   │   ├── useUsers.js          #   Gestión de usuarios
│   │   ├── useFetch.js          #   Hook genérico HTTP
│   │   └── useDebounce.js       #   Debounce para búsquedas
│   └── routes/                  #   Configuración de rutas
│       ├── router.js            #   createBrowserRouter
│       ├── routes.jsx           #   Definición de rutas
│       └── ProtectedRoute.jsx   #   Guard de autenticación
│
├── config/                      #   Configuración global
│   ├── constants.js             #   Roles, labels, colores
│   └── environment.js           #   Variables de entorno
│
├── utils/                       #   Utilidades puras
│   ├── dateFormatter.js         #   Formateo de fechas
│   ├── validators.js            #   Validaciones genéricas
│   └── helpers.js               #   Funciones auxiliares
│
├── styles/                      #   Estilos globales
│   ├── bootstrap-overrides.css  #   Personalización Bootstrap
│   └── global.css               #   Reset, variables, tipografía
│
├── assets/                      #   Imágenes, iconos
├── App.jsx                      #   Componente raíz
└── main.jsx                     #   Punto de entrada
```

---

## Capas del Sistema

### 🔷 MODEL (`src/models/`)

Maneja **datos, estado y comunicación con el backend**. No tiene JSX, no renderiza nada.

#### Services (`models/services/`)
Cada archivo encapsula las llamadas HTTP a un recurso del API:

```js
// Ejemplo: incidentService.js
import apiClient from './apiClient';

export const incidentService = {
  getAll: (params) => apiClient.get('/incidents'),
  getById: (id) => apiClient.get(`/incidents/${id}`),
  create: (data) => apiClient.post('/incidents', data),
  update: (id, data) => apiClient.put(`/incidents/${id}`, data),
  delete: (id) => apiClient.delete(`/incidents/${id}`),
};
```

**`apiClient.js`** es el cliente HTTP central que:
- Agrega automáticamente el token JWT
- Parsea respuestas JSON
- Maneja errores de forma centralizada

#### Store (`models/store/`)
Estado global usando **React Context API**:
- `AuthContext` → usuario actual, token, isAuthenticated
- `IncidentContext` → lista de incidentes
- `AppContext` → combina todos los providers

#### Schemas (`models/schemas/`)
Constantes, enums y funciones de validación:
- Estados de incidentes (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`)
- Prioridades (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
- Funciones `validateIncident()`, `validateUser()`

---

### 🟢 VIEW (`src/views/`)

Componentes **puramente visuales**. Solo reciben datos por props o hooks y renderizan.

**Regla:** Las Views NO deben contener lógica de negocio ni llamadas a API directas.

#### Components
Componentes reutilizables pequeños: `Navbar`, `Spinner`, `StatusBadge`.

#### Pages
Una página por ruta. Cada page usa un hook del controller:

```jsx
// DashboardPage.jsx (VIEW)
import { useDashboard } from '../../controllers/hooks/useDashboard';

function DashboardPage() {
  const { metrics, loading } = useDashboard(); // ← usa CONTROLLER
  // solo renderiza...
}
```

#### Layouts
Wrappers que definen la estructura de la página:
- `AppLayout` → Navbar + contenido + footer (rutas autenticadas)
- `AuthLayout` → Sin navbar (login/register)

---

### 🔶 CONTROLLER (`src/controllers/`)

**Conecta Model con View**. Contiene la lógica de coordinación.

#### Hooks
Cada hook encapsula la lógica de un módulo:

```js
// useIncidents.js (CONTROLLER)
import incidentService from '../../models/services/incidentService';      // ← usa MODEL
import { validateIncident } from '../../models/schemas/incidentSchema';   // ← usa MODEL

export function useIncidents() {
  // lógica: fetch, validar, crear, eliminar
  // retorna datos y funciones para la VIEW
}
```

#### Routes
Configuración de React Router:
- `router.js` → instancia del router
- `routes.jsx` → mapa de rutas → páginas
- `ProtectedRoute.jsx` → guard de autenticación

---

## Flujo de Datos

### Ejemplo: Crear un incidente

```
1. VIEW: ReportIncidentPage.jsx
   └── Usuario llena el formulario y hace click "Enviar"

2. CONTROLLER: useIncidents.js → createIncident(data)
   ├── Valida datos con incidentSchema.validateIncident()
   ├── Llama a incidentService.create(data)
   └── Actualiza IncidentContext + navega a /incidents

3. MODEL:
   ├── incidentService.js → POST /api/incidents
   ├── apiClient.js → agrega token, parsea respuesta
   └── IncidentContext → actualiza lista global

4. VIEW: IncidentListPage.jsx
   └── Se re-renderiza con el nuevo incidente en la lista
```

### Regla de dependencias

```
VIEW → importa → CONTROLLER → importa → MODEL

✅ Correcto:
   Page importa useHook
   Hook importa Service
   Hook importa Schema

❌ Incorrecto:
   Page importa Service directamente
   Service importa componente
```

---

## Guía para Nuevos Desarrolladores

### ¿Cómo agrego una nueva funcionalidad?

Ejemplo: Agregar módulo de **"Reportes"**

1. **MODEL** — Crear el servicio:
   ```
   src/models/services/reportService.js
   ```

2. **MODEL** — Crear el schema (si necesita validación):
   ```
   src/models/schemas/reportSchema.js
   ```

3. **CONTROLLER** — Crear el hook:
   ```
   src/controllers/hooks/useReports.js
   ```

4. **VIEW** — Crear la página:
   ```
   src/views/pages/ReportsPage.jsx
   ```

5. **CONTROLLER** — Registrar la ruta en `routes.jsx`:
   ```jsx
   { path: '/reports', element: <ReportsPage /> }
   ```

6. **VIEW** — Agregar link en el Navbar:
   ```jsx
   <Link to="/reports">📄 Reportes</Link>
   ```

### ¿Cómo agrego un componente reutilizable?

Crear carpeta dentro de `src/views/components/`:
```
src/views/components/Alert/
├── Alert.jsx
└── Alert.css (opcional)
```

**Regla:** Solo entra a `components/` algo que usan **2 o más pages**.

---

## Convenciones y Reglas

### Nomenclatura

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | PascalCase | `IncidentCard.jsx` |
| Hooks | camelCase con `use` | `useIncidents.js` |
| Services | camelCase con `Service` | `incidentService.js` |
| Schemas | camelCase con `Schema` | `incidentSchema.js` |
| Constantes | UPPER_SNAKE_CASE | `INCIDENT_STATUS` |
| Carpetas | kebab-case o camelCase | `root-cause/`, `StatusBadge/` |

### Reglas obligatorias

1. **Views NO importan de Models directamente** (siempre pasan por Controller)
2. **Models NO importan de Views** (nunca)
3. **Services NO tienen estado** (son funciones puras de fetch)
4. **Hooks son el único lugar** donde se mezcla estado + API
5. **Un componente por archivo**
6. **Props destructuradas** en la firma del componente

---

## Sistema de Diseño y UI

La aplicación sigue el documento de especificaciones visuales `DESIGN.md`. La integración de esta estética se realiza bajo reglas estrictas de implementación:

1. **Prioridad a Bootstrap:** El layout general (Márgenes, padding, flexbox, cards, grids) se estructura de forma exclusiva utilizando las clases nativas de **Bootstrap 5**, evitando CSS personalizado siempre que sea posible.
2. **Uso de Colores Inline:** Para mapear la paleta de colores oficial descrita en `DESIGN.md` que no cuente con una clase utility directa de Bootstrap, se emplean estilos inline en React (por ejemplo: `style={{ backgroundColor: '#f7f9fb', color: '#191c1e' }}`).
3. **Iconografía con Bootstrap Icons:** La suite de íconos oficiales del proyecto es **Bootstrap Icons** (cargada a través de CDN en el `index.html`). Esto sustituye el uso de otras tipografías de iconos (como Material Symbols) garantizando compatibilidad y carga optimizada.
4. **Layout Auth (Ej. LoginPage y RegisterPage):**
   - Utilizan la estética de "Glassmorphism" implementando desenfoques de fondo (con pseudo-fondos en `position-absolute` e `filter: blur(...)`).
   - Todos los inputs se presentan dentro de un contenedor `input-group`, alineando íconos de contexto a la izquierda.
   - Las contraseñas integran nativamente la función de mostrar/ocultar mediante el cambio dinámico del ícono (`bi-eye` a `bi-eye-slash`).
   - Los botones de envío se estilan respetando la semántica principal (color `primary: #000000`).

---

## Rutas de la Aplicación

| Ruta | Página | Layout | Acceso |
|------|--------|--------|--------|
| `/login` | LoginPage | AuthLayout | Público |
| `/register` | RegisterPage | AuthLayout | Público |
| `/` | DashboardPage | AppLayout | Autenticado |
| `/dashboard` | DashboardPage | AppLayout | Autenticado |
| `/incidents` | IncidentListPage | AppLayout | Autenticado |
| `/incidents/new` | ReportIncidentPage | AppLayout | Autenticado |
| `/incidents/:id` | IncidentDetailPage | AppLayout | Autenticado |
| `/root-cause` | RootCausePage | AppLayout | Autenticado |
| `/users` | UserManagementPage | AppLayout | Admin |
| `*` | NotFoundPage | Sin layout | Público |

---

## Variables de Entorno

Crear archivo `.env` en la raíz de `Frontend/` (copiar de `.env.example`):

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=OpsCore
```

**Nota:** Todas las variables deben comenzar con `VITE_` para ser accesibles en el frontend.

---

## Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linter
npm run lint
```

---

## Dependencias Principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | 19.x | Librería de UI |
| react-dom | 19.x | Renderizado en DOM |
| react-router-dom | 7.x | Enrutamiento SPA |
| bootstrap | 5.x | Framework CSS |
| bootstrap-icons | N/A (CDN) | Suite de Íconos |
| vite | 8.x | Bundler/Dev server |

---

## Archivos Creados

| Archivo | Capa | Descripción |
|---------|------|-------------|
| `models/services/apiClient.js` | Model | Cliente HTTP base con auth |
| `models/services/authService.js` | Model | API de autenticación |
| `models/services/incidentService.js` | Model | CRUD incidentes |
| `models/services/dashboardService.js` | Model | Métricas y KPIs |
| `models/services/rootCauseService.js` | Model | Análisis de causas |
| `models/services/userService.js` | Model | CRUD usuarios |
| `models/store/AuthContext.jsx` | Model | Estado de autenticación |
| `models/store/IncidentContext.jsx` | Model | Estado de incidentes |
| `models/store/AppContext.jsx` | Model | Provider combinado |
| `models/schemas/incidentSchema.js` | Model | Validación incidentes |
| `models/schemas/userSchema.js` | Model | Validación usuarios |
| `models/schemas/dashboardSchema.js` | Model | Estructura métricas |
| `views/components/Navbar/Navbar.jsx` | View | Barra de navegación |
| `views/components/Spinner/Spinner.jsx` | View | Indicador de carga |
| `views/components/StatusBadge/StatusBadge.jsx` | View | Badge de estado |
| `views/pages/LoginPage.jsx` | View | Página de login (Diseño aplicado) |
| `views/pages/RegisterPage.jsx` | View | Página de registro (Diseño aplicado) |
| `views/pages/DashboardPage.jsx` | View | Dashboard principal |
| `views/pages/IncidentListPage.jsx` | View | Lista de incidentes |
| `views/pages/ReportIncidentPage.jsx` | View | Formulario de reporte |
| `views/pages/IncidentDetailPage.jsx` | View | Detalle de incidente |
| `views/pages/RootCausePage.jsx` | View | Análisis de causas |
| `views/pages/UserManagementPage.jsx` | View | Gestión de usuarios |
| `views/pages/NotFoundPage.jsx` | View | Página 404 |
| `views/layouts/AppLayout.jsx` | View | Layout con navbar |
| `views/layouts/AuthLayout.jsx` | View | Layout sin navbar |
| `views/layouts/MobileLayout.jsx` | View | Layout móvil |
| `controllers/hooks/useAuth.js` | Controller | Lógica de auth |
| `controllers/hooks/useIncidents.js` | Controller | Lógica de incidentes |
| `controllers/hooks/useDashboard.js` | Controller | Lógica del dashboard |
| `controllers/hooks/useRootCause.js` | Controller | Lógica de causas |
| `controllers/hooks/useUsers.js` | Controller | Lógica de usuarios |
| `controllers/hooks/useFetch.js` | Controller | Hook genérico HTTP |
| `controllers/hooks/useDebounce.js` | Controller | Debounce |
| `controllers/routes/router.js` | Controller | Configuración router |
| `controllers/routes/routes.jsx` | Controller | Mapa de rutas |
| `controllers/routes/ProtectedRoute.jsx` | Controller | Guard de auth |
| `config/constants.js` | Config | Constantes globales |
| `config/environment.js` | Config | Variables de entorno |
| `utils/dateFormatter.js` | Utils | Formateo de fechas |
| `utils/validators.js` | Utils | Validaciones |
| `utils/helpers.js` | Utils | Funciones auxiliares |
| `styles/bootstrap-overrides.css` | Styles | Personalización BS |
| `styles/global.css` | Styles | Estilos globales |
| `App.jsx` | Root | Componente raíz |
| `main.jsx` | Root | Punto de entrada |
