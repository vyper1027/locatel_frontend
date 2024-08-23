'use client';

import { useState } from 'react';

export default function ConsultarProducto() {
  const [codigoProducto, setCodigoProducto] = useState('');
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');

  const handleConsultarProducto = async () => {
    const token = localStorage.getItem('token'); // Recupera el token del localStorage

    try {
      const response = await fetch(`/api/productos/${codigoProducto}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Agrega el token en el header de autorización
        },
      });
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      const data = await response.json();
      setProducto(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setProducto(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-blue-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Consultar Producto</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Código del Producto
          </label>
          <input
            type="text"
            value={codigoProducto}
            onChange={(e) => setCodigoProducto(e.target.value)}
            className="w-full p-2 border rounded-lg text-black"
            placeholder="Ingrese el código del producto"
          />
        </div>
        <button
          onClick={handleConsultarProducto}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 w-full"
        >
          Consultar
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {producto && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Detalles del Producto:</h2>
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio:</strong> {producto.precio}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
          </div>
        )}
      </div>
    </div>
  );
}
