# Documentación Técnica del Proyecto: OpsCore - Sistema de Gestión de Incidentes Industriales

## 1. Resumen Ejecutivo
Este proyecto consiste en el desarrollo de una plataforma integral para la gestión, monitoreo y respuesta ante incidentes en entornos industriales. La solución permite centralizar la comunicación entre equipos técnicos, asegurar el cumplimiento de normativas de seguridad y optimizar los tiempos de resolución de fallos críticos.

## 2. Equipo de Desarrollo
El proyecto es ejecutado por un equipo multidisciplinario internacional, distribuido en dos áreas principales:

### Equipo de Desarrollo Front-End
* **Luis Feliz** (República Dominicana)
* **Kalibell Dalmasi** (República Dominicana)
* **Mario Ramos** (Colombia)
* **Pedro Chávez** (México)

### Equipo de Desarrollo Back-End
* **Gonzalo Garcez** (Argentina)
* **Leslie Jiménez** (México)
* **Duban Álvarez** (Colombia)
* **Sonny Pimentel** (Perú)

## 3. Stack Tecnológico
Se ha seleccionado un conjunto de tecnologías modernas y escalables para garantizar el rendimiento y la mantenibilidad del sistema:

* **Frontend:** React.js.
* **Estilos:** Bootstrap 5 (Implementado mediante clases globales/CDN para optimizar el peso del bundle).
* **Backend:** Node.js, Express, Prisma.
* **Base de Datos:** PostgreSQL (Relacional).
* **Testing:** Postman.
* **Entorno de Desarrollo:** Visual Studio Code (Estandarizado para el equipo).

## 4. Arquitectura del Sistema
El sistema se basa en una arquitectura de cliente-servidor desacoplada:

* **Frontend Modular:** El desarrollo se divide en módulos independientes (Autenticación, Dashboard, Reportes, Perfil) para facilitar el trabajo paralelo de los 4 desarrolladores de frontend.
* **API RESTful:** El backend en Node.js expone endpoints documentados para el consumo de datos por parte del cliente.
* **Persistencia de Datos:** Uso de PostgreSQL para garantizar la integridad referencial y la seguridad de la información sensible de los incidentes.

## 5. Módulos del Proyecto (Definición Preliminar)
1.  **Módulo de Autenticación:** Control de acceso seguro para diferentes niveles de usuario (Operadores, Supervisores, Administradores).
2.  **Módulo de Monitoreo (Dashboard):** Visualización en tiempo real del estado de la planta y alertas activas.
3.  **Módulo de Gestión de Incidentes:** Registro, asignación de responsables y seguimiento de tickets de resolución.
4.  **Módulo de Reportes:** Generación de métricas de rendimiento y cumplimiento de seguridad.

## 6. Metodología de Trabajo
Se utiliza una metodología ágil adaptada al entorno remoto:
* **Comunicación:** Sincrónica vía Meet y asincrónica vía WhatsApp.
* **Control de Versiones:** Git y GitHub utilizando la metodología Gitflow.
* **Coordinación Horaria:** Gestión de diferencias horarias entre Argentina, Colombia, México, Perú y República Dominicana.
