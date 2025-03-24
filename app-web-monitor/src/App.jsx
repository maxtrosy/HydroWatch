import React from "react";
import { Routes, Route } from "react-router-dom";
import MonitorPanel from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications"; // Importa Notifications

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<MonitorPanel />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/configuracion" element={<Settings />} />
      <Route path="/notificaciones" element={<Notifications />} /> {/* Agrega la ruta de notificaciones */}
    </Routes>
  );
}
