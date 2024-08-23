'use client';

import { useState } from 'react';
import { Roboto_Flex } from 'next/font/google'; 
import { FaSearch, FaUserTimes } from 'react-icons/fa';

const roboto = Roboto_Flex({ subsets: ['latin'], weight: ['400', '700'] });

export default function EliminarCliente() {
  const [cedula, setCedula] = useState('');
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setCliente(null);

    try {
      const response = await fetch(`/api/clientes/${cedula}`);
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

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:9090/api/v1/usuario/${cedula}`, {
        method: 'DELETE',
        headers: {          
          'Authorization': `Bearer ${token}`,
        },
      });
      
      debugger
      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      setSuccess('Cliente eliminado exitosamente');
      setCliente(null); // Limpiar la información del cliente tras eliminar
      setCedula(''); // Limpiar el campo de búsqueda
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
          Eliminar Cliente
        </h1>
        <p className={`text-xl text-white mt-3 ${roboto.className}`}>
          Busca y elimina un cliente por su cédula
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
          <div className="flex flex-col space-y-4">
            <p className="text-lg text-gray-700">
              <strong>Nombre:</strong> {cliente.nombre}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Correo:</strong> {cliente.correo}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Teléfono:</strong> {cliente.telefono}
            </p>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-red-700 transition duration-300"
            >
              <FaUserTimes className="mr-2" />
              Eliminar Cliente
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
