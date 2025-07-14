import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { Card, CardContent } from "../components/ui/Card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import {
  Thermometer,
  Droplet,
  Zap,
  Eye,
  AlertCircle,
  Download,
  RotateCcw,
  Clock
} from "lucide-react";

const timeRanges = {
  "1h": 60 * 60 * 1000,
  "10h": 10 * 60 * 60 * 1000,
  "1d": 24 * 60 * 60 * 1000,
  "1w": 7 * 24 * 60 * 60 * 1000,
  "1m": 30 * 24 * 60 * 60 * 1000,
};

const chartColors = {
  temp: "#ef4444",
  oxygen: "#3b82f6",
  pH: "#10b981",
  turbidity: "#f59e0b",
};

export default function MonitorPanel() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("1h");
  const [data, setData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = () => {
    const q = query(collection(db, "mediciones"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const now = Date.now();
      const rangeMs = timeRanges[timeRange];

      const docs = snapshot.docs
        .map((doc) => {
          const d = doc.data();
          const timestamp = d.timestamp?.toDate();
          if (!timestamp) return null;
          if (now - timestamp.getTime() > rangeMs) return null;

          return {
            time: timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            temp: d.temperatura ?? 0,
            oxygen: d.oxigeno ?? 0,
            pH: d.ph ?? 0,
            turbidity: d.turbidez ?? 0,
          };
        })
        .filter(Boolean)
        .reverse();

      setData(docs);
      setLastUpdated(new Date().toLocaleTimeString());
    });

    return () => unsubscribe();
  };

  useEffect(() => {
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, [timeRange]);

  const metrics = [
    { key: "temp", label: "Temperatura (°C)", icon: <Thermometer className="text-red-500" /> },
    { key: "oxygen", label: "Oxígeno disuelto (mg/L)", icon: <Droplet className="text-blue-500" /> },
    { key: "pH", label: "pH", icon: <Zap className="text-green-500" /> },
    { key: "turbidity", label: "Turbidez (NTU)", icon: <Eye className="text-yellow-500" /> },
  ];

  const latest = data[data.length - 1];
  const recomendaciones = [];
  const alertas = [];

  if (latest) {
    if (latest.temp < 10 || latest.temp > 30) {
      recomendaciones.push("La temperatura está fuera del rango óptimo (10-30°C).");
      alertas.push("⚠️ Temperatura anormal detectada");
    }
    if (latest.oxygen < 5) {
      recomendaciones.push("El oxígeno disuelto es bajo, considera aumentar la oxigenación.");
      alertas.push("⚠️ Bajo nivel de oxígeno");
    }
    if (latest.pH < 6.5 || latest.pH > 8.5) {
      recomendaciones.push("El pH está fuera del rango seguro. Revisa el sistema.");
      alertas.push("⚠️ pH fuera de rango seguro");
    }
    if (latest.turbidity > 5) {
      recomendaciones.push("La turbidez ha aumentado, se recomienda revisar filtros.");
      alertas.push("⚠️ Alta turbidez detectada");
    }
  }

  const exportarDatos = () => {
    const csv = ["Tiempo,Temperatura,Oxígeno,pH,Turbidez"];
    data.forEach(d => {
      csv.push(`${d.time},${d.temp},${d.oxygen},${d.pH},${d.turbidity}`);
    });
    const blob = new Blob([csv.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos_monitoreo.csv";
    a.click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 to-blue-150">

      <Sidebar />

      <main className="flex-1 px-6 py-10 md:px-12 ml-64 space-y-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-800">Panel de Monitoreo</h1>
            <p className="text-gray-500">Visualización en tiempo real del estado del agua</p>
          </div>
          <div className="flex gap-2 items-center mt-4 md:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="1h">1 Hora</option>
              <option value="10h">10 Horas</option>
              <option value="1d">1 Día</option>
              <option value="1w">1 Semana</option>
              <option value="1m">1 Mes</option>
            </select>
            <button
              onClick={() => fetchData()}
              className="flex items-center gap-2 bg-gray-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-gray-200 border"
            >
              <RotateCcw size={16} /> Actualizar
            </button>
            <button
              onClick={exportarDatos}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Download size={16} /> Exportar
            </button>
          </div>
        </div>

        <section className="text-sm text-gray-500 flex items-center gap-2">
          <Clock size={14} /> Última actualización: {lastUpdated || "Cargando..."}
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <div key={m.key} className="p-5 bg-white rounded-2xl shadow hover:shadow-md border">
              <div className="flex items-center gap-3 mb-2">
                {m.icon}
                <span className="font-semibold text-gray-700 text-sm">{m.label}</span>
              </div>
              <p className="text-2xl font-bold text-blue-800">
                {latest ? latest[m.key] : "--"}
              </p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric) => (
            <Card
              key={metric.key}
              className="border rounded-2xl shadow-sm bg-white hover:shadow-md"
            >
              <CardContent className="p-5">
                <h2 className="text-md font-semibold text-gray-600 mb-2 flex items-center gap-2">
                  {metric.icon} {metric.label}
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={data}>
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={metric.key}
                      stroke={chartColors[metric.key]}
                      strokeWidth={2.5}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </section>

        {alertas.length > 0 && (
          <section className="bg-red-50 border border-red-200 p-4 rounded-xl">
            <h2 className="text-red-600 font-semibold text-lg mb-2 flex items-center gap-2">
              <AlertCircle /> Alertas Actuales
            </h2>
            <ul className="list-disc pl-6 text-sm text-red-700">
              {alertas.map((alert, i) => (
                <li key={i}>{alert}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
          <h2 className="text-blue-800 font-semibold text-lg mb-2">Recomendaciones</h2>
          {latest ? (
            <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
              {recomendaciones.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Esperando datos...</p>
          )}
        </section>
      </main>
    </div>
  );
}
