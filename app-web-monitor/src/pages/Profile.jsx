import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import Sidebar from "../components/ui/Sidebar";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function ProfilePage() {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [user, setUser] = useState({
    name: "",
    email: "",
    photoURL: "",
    phone: "",
    address: "",
    description: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    if (currentUser) {
      setUser({
        name: currentUser.displayName || "",
        email: currentUser.email || "",
        photoURL: currentUser.photoURL || "",
        phone: currentUser.phoneNumber || "",
        address: "",
        description: "",
      });
    }
  }, [currentUser]);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        setFormData((prev) => ({ ...prev, photoURL: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg text-gray-600">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <Sidebar />
      <main className="flex-1 ml-64 px-12 py-14">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Mi perfil</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Administra tu cuenta y personaliza tu perfil.
          </p>
        </header>

        {/* Content */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Avatar y Acción */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group w-40 h-40">
              <img
                src={formData.photoURL || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg"
              />
              {editMode && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  Cambiar
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {editMode ? (
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-6"
                >
                  Guardar
                </Button>
                <Button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium text-sm px-6"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setEditMode(true)}
                className="bg-gray-800 hover:bg-gray-900 text-white font-medium text-sm px-6"
              >
                Editar Perfil
              </Button>
            )}
          </div>

          {/* Datos Personales */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                name="name"
                label="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
              />
              <Input
                name="email"
                label="Correo electrónico"
                value={formData.email}
                disabled
              />
              <Input
                name="phone"
                label="Teléfono"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
              />
              <Input
                name="address"
                label="Dirección"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                disabled={!editMode}
                value={formData.description}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none ${
                  !editMode && "bg-gray-100 cursor-default"
                }`}
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-xs text-gray-400 text-center">
          Última modificación:{" "}
          {new Date().toLocaleDateString("es-ES", {
            dateStyle: "long",
          })}
          <br />
          La información de perfil no se sincroniza automáticamente con Firestore aún.
        </footer>
      </main>
    </div>
  );
}
