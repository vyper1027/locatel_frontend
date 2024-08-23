'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Roboto_Flex } from 'next/font/google'; 
import { FaUserPlus, FaUserEdit, FaUserTimes, FaProductHunt, FaBox, FaChartLine, FaListAlt, FaChartBar, FaTrashAlt, FaPencilAlt } from 'react-icons/fa';

const roboto = Roboto_Flex({ subsets: ['latin'], weight: ['400', '700'] });

export default function MainBoard() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch('/api/ventas');
        if (!response.ok) {
          throw new Error('Error fetching ventas');
        }
        const data = await response.json();
        setVentas(data);
      } catch (error) {
        console.error('Error fetching ventas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-r from-teal-400 to-blue-600 p-6">
      <header className="mb-8 text-center">
        <h1 className={`text-5xl font-extrabold text-white ${roboto.className}`}>
          Panel de Control
        </h1>
        <p className={`text-xl text-white mt-3 ${roboto.className}`}>
          Bienvenido al sistema de ventas de Locatel
        </p>
      </header>
      
      {/* Información del usuario */}
      <section className="bg-white rounded-lg shadow-lg p-6 mb-6 mx-auto max-w-md">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl text-gray-700">U</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Nombre del Usuario</h3>
            <p className="text-gray-600">rol_del_usuario@example.com</p>
          </div>
        </div>
      </section>
      
      <section className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
        {/* Sección de Clientes */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Clientes</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/crearCliente" className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg text-center hover:bg-green-600 transition duration-300">
                <FaUserPlus className="mr-2" />
                Crear Cliente
              </Link>
            </li>
            <li>
              <Link href="/consultarCliente" className="flex items-center bg-gray-600 text-white py-2 px-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
                <FaListAlt className="mr-2" />
                Consultar Clientes
              </Link>
            </li>
            <li>
              <Link href="/editarCliente" className="flex items-center bg-yellow-500 text-white py-2 px-6 rounded-lg text-center hover:bg-yellow-600 transition duration-300">
                <FaUserEdit className="mr-2" />
                Editar Cliente
              </Link>
            </li>
            <li>
              <Link href="/eliminarCliente" className="flex items-center w-full bg-red-500 text-white py-2 px-6 rounded-lg text-center hover:bg-red-600 transition duration-300">
                <FaUserTimes className="mr-2" />
                Eliminar Cliente
              </Link>
            </li>
          </ul>
        </div>

        {/* Sección de Productos */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Productos</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/crearProducto" className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg text-center hover:bg-green-600 transition duration-300">
                <FaProductHunt className="mr-2" />
                Crear Producto
              </Link>
            </li>
            <li>
              <Link href="/consultarProducto" className="flex items-center bg-gray-600 text-white py-2 px-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
                <FaBox className="mr-2" />
                Consultar Productos
              </Link>
            </li>
            <li>
              <Link href="/editarProducto" className="flex items-center bg-yellow-500 text-white py-2 px-6 rounded-lg text-center hover:bg-yellow-600 transition duration-300">
                <FaPencilAlt className="mr-2" />
                Editar Producto
              </Link>
            </li>
            <li>
              <button className="flex items-center w-full bg-red-500 text-white py-2 px-6 rounded-lg text-center hover:bg-red-600 transition duration-300">
                <FaTrashAlt className="mr-2" />
                Eliminar Producto
              </button>
            </li>
          </ul>
        </div>

        {/* Sección de Ventas */}
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-1/3 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-green-700 mb-4">Ventas</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/registrarVenta" className="flex items-center bg-green-500 text-white py-2 px-6 rounded-lg text-center hover:bg-green-600 transition duration-300">
                <FaChartLine className="mr-2" />
                Registrar Venta
              </Link>
            </li>
            <li>
              <Link href="/listarVentas" className="flex items-center bg-gray-600 text-white py-2 px-6 rounded-lg text-center hover:bg-gray-700 transition duration-300">
                <FaChartBar className="mr-2" />
                Listar Ventas
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
