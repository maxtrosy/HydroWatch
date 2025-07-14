import React, { useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import { Switch } from "../components/ui/Switch";
import { Select } from "../components/ui/Select";
import { Button } from "../components/ui/Button";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "es",
    autoUpdates: true,
    dataSharing: false,
    showActivityStatus: true,
    textSize: "md",
    colorBlindMode: false,
    sessionTimeout: "30m",
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-150 text-gray-800">
      <Sidebar />

      <main className="flex-1 ml-64 px-8 py-12">
        {/* Encabezado */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight leading-snug text-blue-900">
            Configuración
          </h1>
          <p className="text-gray-600 mt-3 text-base">
            Administra tu experiencia, privacidad y preferencias visuales.
          </p>
        </div>

        {/* Contenedor de ajustes */}
        <section className="max-w-4xl mx-auto divide-y divide-gray-200 rounded-xl bg-white p-10 shadow-md backdrop-blur-sm bg-opacity-70 transition-all duration-300 space-y-10">
          {/* Preferencias generales */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Preferencias Generales</h2>

            <SettingItem
              label="Notificaciones"
              description="Recibe alertas importantes."
              control={
                <Switch
                  checked={settings.notifications}
                  onChange={() => handleToggle("notifications")}
                />
              }
            />

            <SettingItem
              label="Modo oscuro"
              description="Activa el tema oscuro para cuidar tu vista."
              control={
                <Switch
                  checked={settings.darkMode}
                  onChange={() => handleToggle("darkMode")}
                />
              }
            />

            <SettingItem
              label="Idioma"
              description="Selecciona tu idioma preferido."
              control={
                <Select
                  value={settings.language}
                  onChange={(e) => handleSelectChange("language", e.target.value)}
                  className="w-44 border-gray-300 rounded-md"
                >
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                  <option value="fr">Francés</option>
                </Select>
              }
            />

            <SettingItem
              label="Actualizaciones automáticas"
              description="Recibe mejoras y correcciones automáticamente."
              control={
                <Switch
                  checked={settings.autoUpdates}
                  onChange={() => handleToggle("autoUpdates")}
                />
              }
            />
          </div>

          {/* Privacidad */}
          <div className="space-y-6 pt-10">
            <h2 className="text-2xl font-semibold mb-4">Privacidad y Seguridad</h2>

            <SettingItem
              label="Compartir datos de uso"
              description="Ayuda a mejorar la app enviando datos anónimos."
              control={
                <Switch
                  checked={settings.dataSharing}
                  onChange={() => handleToggle("dataSharing")}
                />
              }
            />

            <SettingItem
              label="Mostrar estado en línea"
              description="Permite que otros vean cuándo estás activo."
              control={
                <Switch
                  checked={settings.showActivityStatus}
                  onChange={() => handleToggle("showActivityStatus")}
                />
              }
            />
          </div>

          {/* Accesibilidad */}
          <div className="space-y-6 pt-10">
            <h2 className="text-2xl font-semibold mb-4">Accesibilidad</h2>

            <SettingItem
              label="Tamaño del texto"
              description="Ajusta el tamaño del texto en la aplicación."
              control={
                <Select
                  value={settings.textSize}
                  onChange={(e) => handleSelectChange("textSize", e.target.value)}
                  className="w-36 border-gray-300 rounded-md"
                >
                  <option value="sm">Pequeño</option>
                  <option value="md">Medio</option>
                  <option value="lg">Grande</option>
                </Select>
              }
            />

            <SettingItem
              label="Modo para daltonismo"
              description="Activa colores alternativos para mejor visibilidad."
              control={
                <Switch
                  checked={settings.colorBlindMode}
                  onChange={() => handleToggle("colorBlindMode")}
                />
              }
            />
          </div>

          {/* Cuenta y sesiones */}
          <div className="space-y-6 pt-10">
            <h2 className="text-2xl font-semibold mb-4">Cuenta y Sesiones</h2>

            <SettingItem
              label="Tiempo de cierre automático"
              description="Cierra sesión después de inactividad."
              control={
                <Select
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    handleSelectChange("sessionTimeout", e.target.value)
                  }
                  className="w-36 border-gray-300 rounded-md"
                >
                  <option value="15m">15 minutos</option>
                  <option value="30m">30 minutos</option>
                  <option value="1h">1 hora</option>
                  <option value="never">Nunca</option>
                </Select>
              }
            />

            <Button
              variant="outline"
              className="text-red-600 border-red-300 hover:bg-red-50"
              onClick={() => alert("Sesiones cerradas en todos los dispositivos.")}
            >
              Cerrar sesión en todos los dispositivos
            </Button>
          </div>

          {/* Guardar cambios */}
          <div className="pt-10">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              Guardar cambios
            </Button>
          </div>
        </section>

        <div className="text-center text-xs text-gray-500 mt-10">
          Última modificación: Julio 2025 · v1.3.2
        </div>
      </main>
    </div>
  );
}

// Componente reutilizable
function SettingItem({ label, description, control }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-base font-medium text-gray-800">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      {control}
    </div>
  );
}
