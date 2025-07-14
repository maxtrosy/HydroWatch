import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Bell, Settings, Map } from "lucide-react";

const navItems = [
  { icon: <Home className="w-5 h-5" />, label: "Inicio", path: "/dashboard" },
  { icon: <User className="w-5 h-5" />, label: "Perfil", path: "/perfil" },
  { icon: <Bell className="w-5 h-5" />, label: "Alertas", path: "/notificaciones" },
  { icon: <Settings className="w-5 h-5" />, label: "Configuración", path: "/configuracion" },
  { icon: <Map className="w-5 h-5" />, label: "Monitoreo", path: "/monitoreo" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-64 fixed top-0 left-0 min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 border-r border-gray-800 shadow-xl px-6 py-8 z-40">
      {/* Branding */}
      <div className="mb-12 flex items-center gap-3">
        <img
          src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hydro.svg"
          alt="HydroWatch Logo"
          className="w-8 h-8 text-blue-500"
        />
        <div>
          <h1 className="text-2xl font-extrabold text-blue-500 tracking-wide">HydroWatch</h1>
          <p className="text-xs text-gray-400 mt-0.5">Panel de Control</p>
        </div>
      </div>

      {/* Navegación */}
      <ul className="space-y-2" role="navigation" aria-label="Menú de navegación">
        {navItems.map(({ icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <li
              key={label}
              onClick={() => navigate(path)}
              role="link"
              tabIndex={0}
              aria-label={`Ir a ${label}`}
              onKeyDown={(e) => e.key === "Enter" && navigate(path)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all
                ${isActive
                  ? "bg-blue-600/20 text-blue-400 font-semibold"
                  : "text-gray-300 hover:bg-blue-600/10 hover:text-blue-300"}`}
            >
              {icon}
              <span className="text-sm">{label}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
