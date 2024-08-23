'use client';

import { useState, useEffect } from 'react';

export default function CrearUsuario() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Obtén el token del localStorage o del estado global
  // const token = localStorage.getItem('jwt');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = {
      cedula,
      nombre,
      direccion,
      telefono,
      email,
      contraseña,
      rol: 'CLIENTE',
    };
    console.log('agregar usuario', usuario);
    
    try {
      const response = await fetch('http://localhost:9090/api/v1/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'          
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {        
        setCedula('');
        setNombre('');
        setDireccion('');
        setTelefono('');
        setEmail('');
        setContraseña('');
        setIsModalOpen(true); // Abrir modal en caso de éxito
      } else {
        alert('Error al crear el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al crear el usuario');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-600 to-blue-500 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Crear Usuario</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="mb-6">
            <label htmlFor="cedula" className="block text-sm font-semibold text-gray-700">
              Cédula
            </label>
            <input
              id="cedula"
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              placeholder="Ingresa la cédula"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              placeholder="Ingresa el nombre"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="direccion" className="block text-sm font-semibold text-gray-700">
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              placeholder="Ingresa la dirección"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700">
              Teléfono
            </label>
            <input
              id="telefono"
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              placeholder="Ingresa el teléfono"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              placeholder="Ingresa el email"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contraseña" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
              placeholder="Ingresa la contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Crear Usuario
          </button>
        </form>
      </div>

      {/* Modal de éxito */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold text-green-700 mb-4">¡Éxito!</h3>
            <p className="text-gray-800">Usuario creado con éxito.</p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
