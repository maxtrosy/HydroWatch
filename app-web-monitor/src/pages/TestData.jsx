// src/pages/TestData.jsx
import React from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

const generarDatoAleatorio = () => {
  return {
    temperatura: parseFloat((20 + Math.random() * 10).toFixed(1)), // entre 20 y 30 °C
    oxigeno: parseFloat((6 + Math.random() * 3).toFixed(1)),       // entre 6 y 9 mg/L
    ph: parseFloat((6.5 + Math.random()).toFixed(2)),              // entre 6.5 y 7.5
    turbidez: parseFloat((1 + Math.random() * 5).toFixed(2)),      // entre 1 y 6 NTU
    timestamp: Timestamp.now(), // fecha y hora actual
  };
};

export default function TestData() {
  const insertarDatos = async () => {
    const promises = [];
    for (let i = 0; i < 20; i++) {
      const datos = generarDatoAleatorio();
      datos.timestamp = Timestamp.fromDate(
        new Date(Date.now() - i * 60 * 60 * 1000) // cada hora hacia atrás
      );
      promises.push(addDoc(collection(db, "mediciones"), datos));
    }

    try {
      await Promise.all(promises);
      alert("✅ 20 documentos insertados correctamente");
    } catch (err) {
      console.error("Error insertando documentos:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generar datos de prueba</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={insertarDatos}
      >
        Insertar 20 datos de prueba
      </button>
    </div>
  );
}
