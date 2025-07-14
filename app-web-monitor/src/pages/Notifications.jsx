import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { Bell, CheckCircle } from "lucide-react"; // Opcional: si usas lucide-react

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const now = new Date();
    const earlier = new Date();
    earlier.setDate(now.getDate() - 1);

    const fetchedNotifications = [
      {
        id: 1,
        message: "Nueva alerta en el sistema",
        read: false,
        date: now.toISOString(),
      },
      {
        id: 2,
        message: "Actualización disponible",
        read: true,
        date: earlier.toISOString(),
      },
      {
        id: 3,
        message: "Recordatorio de mantenimiento",
        read: false,
        date: now.toISOString(),
      },
    ];

    setNotifications(fetchedNotifications);
  }, []);

  const handleNotificationClick = (id) => {
    navigate(`/notification/${id}`);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const today = new Date().toDateString();
  const grouped = {
    hoy: notifications.filter((n) => new Date(n.date).toDateString() === today),
    anteriores: notifications.filter((n) => new Date(n.date).toDateString() !== today),
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-150 text-gray-800">
      <Sidebar />

      <main className="flex-1 ml-64 px-8 py-12">
        {/* Encabezado */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-blue-900">Notificaciones</h1>
            <p className="text-gray-600 mt-2 text-base">
              Mantente al tanto de lo importante en tiempo real.
            </p>
          </div>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-700 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Marcar todo como leído
            </button>
          )}
        </div>

        {/* Panel principal */}
        <div className="max-w-3xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md p-8 backdrop-blur">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-gray-500 text-sm">No tienes notificaciones aún.</div>
          ) : (
            <>
              {["hoy", "anteriores"].map((section) =>
                grouped[section].length > 0 ? (
                  <div key={section} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-600 mb-4 capitalize">
                      {section === "hoy" ? "Hoy" : "Anteriores"}
                    </h3>
                    <ul className="space-y-4">
                      {grouped[section].map((n) => (
                        <li
                          key={n.id}
                          onClick={() => handleNotificationClick(n.id)}
                          className={`flex justify-between items-start p-5 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                            n.read
                              ? "bg-gray-100 border-gray-200"
                              : "bg-blue-100 border-blue-300"
                          }`}
                        >
                          <div>
                            <p className="font-medium text-gray-800 flex items-center gap-2">
                              {!n.read ? (
                                <Bell size={16} className="text-blue-500" />
                              ) : (
                                <CheckCircle size={16} className="text-green-400" />
                              )}
                              {n.message}
                            </p>
                            <span className="text-xs text-gray-500 block mt-1">
                              {formatDate(n.date)}
                            </span>
                          </div>
                          {!n.read && (
                            <span className="text-sm text-blue-600 font-medium">Nuevo</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-12">
          Última sincronización: {new Date().toLocaleDateString("es-ES", { dateStyle: "long" })}
        </div>
      </main>
    </div>
  );
}
