'use client';

import { useState } from 'react';
import { Roboto_Flex } from 'next/font/google'; 
import { FaSearch, FaUser } from 'react-icons/fa';

const roboto = Roboto_Flex({ subsets: ['latin'], weight: ['400', '700'] });

export default function ConsultarCliente() {
  const [cedula, setCedula] = useState('');
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCliente(null);

    try {
      const response = await fetch(`http://localhost:9090/api/v1/usuario/${cedula}`);
      if (!response.ok) {
        throw new Error('Cliente no encontrado');
      }
      const data = await response.json();
      // console.log(data)
      setCliente(data);
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
          Consultar Cliente
        </h1>
        <p className={`text-xl text-white mt-3 ${roboto.className}`}>
          Busca la información de un cliente por su cédula
        </p>
      </header>
      
      <section className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
        <form onSubmit={handleSearch} className="flex flex-col space-y-4">
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

        {error && <p className="text-center text-red-600 mt-4">No existe cliente asociado a esta cedula</p>}

        {cliente && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalles del Cliente</h2>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <FaUser className="text-2xl text-gray-700" />
              </div>
              <div>
                <p className="text-lg font-semibold text-black">Nombre: {cliente.nombre}</p>
                <p className="text-lg font-semibold text-black">Cédula: {cliente.cedula}</p>
                <p className="text-lg font-semibold text-black">Correo: {cliente.email}</p>
                <p className="text-lg font-semibold text-black">Teléfono: {cliente.telefono}</p>
                <p className="text-lg font-semibold text-black">Dirección: {cliente.direccion}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
