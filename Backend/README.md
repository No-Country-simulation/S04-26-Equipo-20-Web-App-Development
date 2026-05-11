# Documentación de la API

Esta documentación describe los endpoints disponibles en el backend para la gestión de usuarios, autenticación e incidentes.

**Configuración antes de ejecutar el backend**
1. Asegúrate de tener instalado PostgreSQL y que se esté ejecutando.
2. Crea la base de datos llamada `prueba` con el schema `public`.
3. Ejecuta las migraciones para crear las tablas con el comando `npm run dev:migration`.
4. Crea un archivo .env o haz una copia de .env.example y completa con las variables requeridas:

DB_URL="URL_DE_TU_BASE_DE_DATOS"
JWT_SECRET="CLAVE_SECRETA_PARA_JWT"
JWT_EXPIRES_IN="TIEMPO_DE_EXPIRACION_DEL_TOKEN_ejemplo_10h"
PORT=NUMERO_DE_PUERTO

5. Ejecuta el backend con el comando `npm run dev`.

**Base URL:** `http://localhost:3000/api`
El puerto puede cambiar si see configura en el .env como PORT=XXXX
---

## Autenticación y Usuarios

| Método | Endpoint | Descripción | Requiere Token |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/register` | Registra un nuevo usuario con contraseña hasheada. | No |
| `POST` | `/users/login` | Autentica un usuario y devuelve un token JWT. | No |

---

## Gestión de Incidentes

Todos estos endpoints requieren el header `Authorization: Bearer <JWT_TOKEN>`.

### Consultas y Creación

| Método | Endpoint | Descripción | Roles Permitidos |
| :--- | :--- | :--- | :--- |
| `POST` | `/incidents` | Registra un nuevo incidente en estado `OPEN`. | Todos |
| `GET` | `/incidents` | Lista todos los incidentes (permite filtros por query: `status`, `type`, `priority`, `areaId`). | Todos |
| `GET` | `/incidents/:id` | Obtiene el detalle completo de un incidente por su ID (incluye historial y comentarios). | Todos |

### Gestión de Estados (Ciclo de Vida)

| Método | Endpoint | Descripción | Roles Permitidos |
| :--- | :--- | :--- | :--- |
| `PUT` | `/incidents/:id/assign` | Asigna un usuario con rol `TECNICO` al incidente. Cambia estado a `ASSIGNED`. | `ADMIN`, `SUPERVISOR` |
| `PUT` | `/incidents/:id/start` | El técnico asignado inicia el trabajo. Cambia estado a `IN_PROGRESS`. | `TECNICO` (Solo el asignado) |
| `PUT` | `/incidents/:id/resolve` | El técnico resuelve el incidente aportando la solución y causa raíz. Cambia estado a `RESOLVED`. | `TECNICO` (Solo el asignado) |
| `PUT` | `/incidents/:id/close` | Finaliza oficialmente el incidente. Cambia estado a `CLOSED`. | `ADMIN`, `SUPERVISOR` |
| `PUT` | `/incidents/:id/cancel` | Cancela el incidente en cualquier estado previo. Cambia estado a `CANCELLED`. | `ADMIN`, `SUPERVISOR` |

### Comentarios e Historial

| Método | Endpoint | Descripción | Roles Permitidos |
| :--- | :--- | :--- | :--- |
| `POST` | `/incidents/:id/comments` | Agrega un comentario al incidente. | Todos |
| `GET` | `/incidents/:id/history` | Obtiene la trazabilidad de cambios de estado del incidente. | Todos |

---

## Áreas (Básico)

| Método | Endpoint | Descripción | Roles Permitidos |
| :--- | :--- | :--- | :--- |
| `GET` | `/areas` | Lista todas las áreas disponibles. | Todos |
| `POST` | `/areas` | Crea una nueva área. | `ADMIN` |

---

## Notas Adicionales

*   **Validación:** Todos los endpoints cuentan con validaciones de campos obligatorios y formatos de datos.
*   **Seguridad:** El token JWT expira en 8 horas (configurable en `.env`).
*   **Roles:** Los roles soportados son `ADMIN`, `TECNICO`, `OPERARIO` y `SUPERVISOR`.
