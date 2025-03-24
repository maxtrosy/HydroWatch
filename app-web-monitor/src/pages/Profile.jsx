import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Juan Pérez",
    email: "juanperez@example.com",
    role: "Administrador",
    phone: "+57 300 123 4567",
    address: "Calle 123, Bogotá, Colombia",
    description: "Apasionado por la tecnología y la gestión acuícola.",
    profileImage: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barra lateral */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 p-8 ml-64">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Encabezado */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h2 className="text-3xl font-bold text-white">Perfil de Usuario</h2>
          </div>

          {/* Cuerpo del perfil */}
          <div className="p-8">
            {/* Foto de perfil */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <img
                src={formData.profileImage || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              )}
            </div>

            {/* Formulario o vista de detalles */}
            {editMode ? (
              <div className="space-y-6">
                <Input name="name" label="Nombre" value={formData.name} onChange={handleChange} />
                <Input name="email" label="Correo" value={formData.email} onChange={handleChange} />
                <Input name="role" label="Rol" value={formData.role} onChange={handleChange} />
                <Input name="phone" label="Teléfono" value={formData.phone} onChange={handleChange} />
                <Input name="address" label="Dirección" value={formData.address} onChange={handleChange} />
                <textarea
                  name="description"
                  placeholder="Descripción..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  rows="4"
                ></textarea>

                <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 text-white transition">
                  Guardar Cambios
                </Button>
              </div>
            ) : (
              <div className="space-y-4 text-gray-700">
                <p><strong>Nombre:</strong> {user.name}</p>
                <p><strong>Correo:</strong> {user.email}</p>
                <p><strong>Rol:</strong> {user.role}</p>
                <p><strong>Teléfono:</strong> {user.phone}</p>
                <p><strong>Dirección:</strong> {user.address}</p>
                <p><strong>Descripción:</strong> {user.description}</p>

                <Button onClick={() => setEditMode(true)} className="w-full mt-6 bg-gray-800 hover:bg-gray-900 text-white transition">
                  Editar Perfil
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}