import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar"; // Asegúrate de que Sidebar esté correctamente importado

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulando la obtención de notificaciones
    const fetchedNotifications = [
      { id: 1, message: "Nueva alerta en el sistema", read: false },
      { id: 2, message: "Actualización de la aplicación disponible", read: true },
      { id: 3, message: "Recordatorio de mantenimiento", read: false },
    ];
    setNotifications(fetchedNotifications);
  }, []);

  const handleNotificationClick = (id) => {
    navigate(`/notification/${id}`); // Redirige a una vista de detalle para la notificación
  };

  return (
    <div className="flex">
      {/* Barra lateral reutilizable */}
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6 ml-64">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Notificaciones</h2>

          {notifications.length === 0 ? (
            <p className="text-gray-500">No tienes notificaciones.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`p-4 rounded-md ${notification.read ? "bg-gray-200" : "bg-blue-100"} cursor-pointer`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <p className="text-gray-800">{notification.message}</p>
                  {!notification.read && (
                    <span className="text-sm text-blue-500">Nuevo</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
