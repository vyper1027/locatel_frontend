'use client';

import { useState, useEffect } from 'react';
import { Roboto_Flex } from 'next/font/google'; 
import { FaSearch, FaUserEdit } from 'react-icons/fa';

const roboto = Roboto_Flex({ subsets: ['latin'], weight: ['400', '700'] });

export default function EditarCliente() {
  const [cedula, setCedula] = useState('');
  const [cliente, setCliente] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre);
      setCorreo(cliente.email);
      setTelefono(cliente.telefono);
    }
  }, [cliente]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setCliente(null);

    try {
      const response = await fetch(`http://localhost:9090/api/v1/usuario/${cedula}`);
      if (!response.ok) {
        throw new Error('Cliente no encontrado');
      }
      const data = await response.json();
      setCliente(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:9090/api/v1/usuario/${cedula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, correo, telefono }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el cliente');
      }

      setSuccess('Cliente actualizado exitosamente');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 to-blue-600 p-6">
      <header className="mb-8 text-center">
        <h1 className={`text-4xl font-extrabold text-white ${roboto.className}`}>
          Editar Cliente
        </h1>
        <p className={`text-xl text-white mt-3 ${roboto.className}`}>
          Modifica la información del cliente por su cédula
        </p>
      </header>
      
      <section className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
        <form onSubmit={handleSearch} className="flex flex-col space-y-4 mb-6">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese la cédula del cliente"
              className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition duration-300"
            >
              <FaSearch className="mr-2" />
              Buscar
            </button>
          </div>
        </form>

        {loading && <p className="text-center text-gray-700 mt-4">Cargando...</p>}

        {error && <p className="text-center text-red-600 mt-4">{error}</p>}

        {success && <p className="text-center text-green-600 mt-4">{success}</p>}

        {cliente && (
          <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="border border-gray-300 text-black rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Correo:</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="border border-gray-300 text-black rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-semibold">Teléfono:</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border border-gray- text-black rounded-lg px-4 py-2"
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition duration-300"
            >
              <FaUserEdit className="mr-2" />
              Actualizar Cliente
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
