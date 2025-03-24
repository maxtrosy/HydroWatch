import React, { useState } from "react";
import Sidebar from "../components/ui/Sidebar"; // Barra de menú
import { Switch } from "../components/ui/Switch"; // Componente de interruptor
import { Select } from "../components/ui/Select"; // Componente de selección
import { Button } from "../components/ui/Button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "es",
    autoUpdates: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSelectChange = (e) => {
    setSettings({ ...settings, language: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Barra de menú */}
      <Sidebar />

      {/* Contenido de Configuración */}
      <div className="flex-1 p-8 ml-64">
        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Configuración</h1>
          <p className="text-gray-500 mt-2">Personaliza tu experiencia en la plataforma.</p>
        </div>

        {/* Panel de Configuración */}
        <div className="max-w-4xl mx-auto bg-white shadow-sm rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Preferencias Generales</h2>

          {/* Opciones de Configuración */}
          <div className="space-y-8">
            {/* Notificaciones */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">Activar notificaciones</p>
                <p className="text-gray-500 text-sm">Recibe alertas importantes en tiempo real.</p>
              </div>
              <Switch checked={settings.notifications} onChange={() => handleToggle("notifications")} />
            </div>

            {/* Modo oscuro */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">Modo oscuro</p>
                <p className="text-gray-500 text-sm">Cambia la apariencia a un tema oscuro.</p>
              </div>
              <Switch checked={settings.darkMode} onChange={() => handleToggle("darkMode")} />
            </div>

            {/* Idioma */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">Idioma</p>
                <p className="text-gray-500 text-sm">Selecciona tu idioma preferido.</p>
              </div>
              <Select value={settings.language} onChange={handleSelectChange} className="w-40">
                <option value="es">Español</option>
                <option value="en">Inglés</option>
                <option value="fr">Francés</option>
              </Select>
            </div>

            {/* Actualizaciones Automáticas */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-700 font-medium">Actualizaciones automáticas</p>
                <p className="text-gray-500 text-sm">Mantén tu aplicación siempre actualizada.</p>
              </div>
              <Switch checked={settings.autoUpdates} onChange={() => handleToggle("autoUpdates")} />
            </div>
          </div>

          {/* Botón de Guardar */}
          <div className="mt-10">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}