import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Home",
    icon: "bi-house",
    activeIcon: "bi-house-fill",
  },
  {
    to: "/incidents",
    label: "Incidentes",
    icon: "bi-card-list",
    activeIcon: "bi-card-checklist",
  }, // Cambiado para que sí exista
  {
    to: "/root-cause",
    label: "Reportes",
    icon: "bi-bar-chart",
    activeIcon: "bi-bar-chart-fill",
  },
  {
    to: "/users",
    label: "Ajustes",
    icon: "bi-gear",
    activeIcon: "bi-gear-fill",
  },
];

function Navbar() {
  return (
    <footer
      className="fixed-bottom w-100"
      style={{
        backgroundColor: "rgba(247, 249, 251, 0.8)",
        backdropFilter: "blur(12px)",
        zIndex: 1040,
      }}
    >
      <div
        className="w-100 mx-auto d-flex justify-content-between align-items-center px-4 py-3"
        style={{ maxWidth: "1440px" }}
      >
        <div className="d-flex w-100 justify-content-around align-items-end">
          {NAV_ITEMS.map(({ to, label, icon, activeIcon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `d-flex flex-column align-items-center gap-1 text-decoration-none ${isActive ? "" : "opacity-75"}`
              }
              style={({ isActive }) => ({
                color: isActive ? "#000000" : "#505f76",
                cursor: "pointer",
              })}
            >
              {({ isActive }) => (
                <>
                  {/* Aquí usamos activeIcon si está activo, sino el icon normal */}
                  <i className={`bi ${isActive ? activeIcon : icon} fs-4`}></i>
                  <span className="fw-semibold" style={{ fontSize: "12px" }}>
                    {label}
                  </span>
                  {isActive && (
                    <div
                      className="rounded-circle mt-1"
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#000000",
                      }}
                    ></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Navbar;
