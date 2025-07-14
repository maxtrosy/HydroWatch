// src/components/DataForm.jsx
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../../firebase";

export default function DataForm() {
  const [data, setData] = useState({ temperatura: "", ph: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "mediciones"), {
        ...data,
        temperatura: parseFloat(data.temperatura),
        ph: parseFloat(data.ph),
        timestamp: serverTimestamp()
      });
      alert("Datos guardados correctamente");
      setData({ temperatura: "", ph: "" });
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded shadow">
      <input
        type="number"
        name="temperatura"
        value={data.temperatura}
        onChange={handleChange}
        placeholder="Temperatura"
        className="border p-2 m-2"
        required
      />
      <input
        type="number"
        name="ph"
        value={data.ph}
        onChange={handleChange}
        placeholder="pH"
        className="border p-2 m-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar datos
      </button>
    </form>
  );
}
