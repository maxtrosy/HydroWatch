import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, User, Bell, Settings, Map } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 min-h-screen fixed top-0 left-0">
      <h2 className="text-xl font-bold mb-4">Menú</h2>
      <ul className="space-y-4">
        <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={() => navigate("/dashboard")}>
          <Home className="w-5 h-5" /> <span>Dashboard</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={() => navigate("/perfil")}>
          <User className="w-5 h-5" /> <span>Perfil</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={() => navigate("/notificaciones")}>
          <Bell className="w-5 h-5" /> <span>Notificaciones</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={() => navigate("/configuracion")}>
          <Settings className="w-5 h-5" /> <span>Configuración</span>
        </li>
        <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-400" onClick={() => navigate("/monitoreo")}>
          <Map className="w-5 h-5" /> <span>Monitoreo de Finca</span>
        </li>
      </ul>
    </aside>
  );
}
