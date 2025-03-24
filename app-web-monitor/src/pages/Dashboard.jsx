import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar"; // ✅ Importamos la barra lateral
import { Card, CardContent } from "../components/ui/Card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { time: "10:00", temp: 25, oxygen: 6.5, pH: 7.2, turbidity: 5 },
  { time: "10:30", temp: 26, oxygen: 6.8, pH: 7.3, turbidity: 6 },
  { time: "11:00", temp: 27, oxygen: 6.6, pH: 7.1, turbidity: 7 },
  { time: "11:30", temp: 28, oxygen: 6.4, pH: 7.0, turbidity: 8 },
];

export default function MonitorPanel() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("1h");

  return (
    <div className="flex">
      {/* ✅ Barra lateral reutilizable */}
      <Sidebar />

      {/* ✅ Contenido del panel de monitoreo */}
      <div className="flex-1 p-6 ml-64">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Panel de Monitoreo</h1>
          <select
            className="p-2 border rounded"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1h">1 Hora</option>
            <option value="10h">10 Horas</option>
            <option value="1d">1 Día</option>
            <option value="1w">1 Semana</option>
            <option value="1m">1 Mes</option>
          </select>
        </div>

        {/* ✅ Gráficos */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {Object.keys(data[0]).slice(1).map((key) => (
            <Card key={key} className="shadow-lg rounded-lg">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{key.charAt(0).toUpperCase() + key.slice(1)} del Agua</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey={key} stroke="#ff7300" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ✅ Tabla de datos */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Resumen de Datos</h2>
          <table className="w-full mt-2 border-collapse border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Tiempo</th>
                <th className="border p-2">Temperatura</th>
                <th className="border p-2">Oxígeno</th>
                <th className="border p-2">pH</th>
                <th className="border p-2">Turbidez</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="text-center bg-white hover:bg-gray-100 transition">
                  <td className="border p-2">{row.time}</td>
                  <td className="border p-2">{row.temp}°C</td>
                  <td className="border p-2">{row.oxygen} mg/L</td>
                  <td className="border p-2">{row.pH}</td>
                  <td className="border p-2">{row.turbidity} NTU</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Recomendaciones */}
        <div className="mt-6 p-4 bg-blue-100 rounded shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Recomendaciones</h2>
          <p className="mt-2 text-gray-700">Basado en los datos actuales:</p>
          <ul className="list-disc pl-5 text-gray-700">
            <li>La temperatura está dentro del rango ideal.</li>
            <li>El oxígeno disuelto está en un nivel adecuado.</li>
            <li>El pH es estable, no se requieren ajustes.</li>
            <li>La turbidez ha aumentado, se recomienda revisar filtros.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
