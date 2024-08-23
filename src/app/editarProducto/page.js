'use client';

import { useState } from 'react';

export default function EditarProducto() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [valorVenta, setValorVenta] = useState('');
  const [manejaIva, setManejaIva] = useState(false);
  const [porcentajeIva, setPorcentajeIva] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías realizar la lógica para actualizar los datos en el backend.
    console.log({
      codigo,
      nombre,
      valorVenta,
      manejaIva,
      porcentajeIva: manejaIva ? porcentajeIva : '0%',
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-600 to-blue-500 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Editar Producto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="codigo" className="block text-sm font-semibold text-gray-700">
              Código
            </label>
            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ingresa el código del producto a editar"
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
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ingresa el nuevo nombre del producto"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="valorVenta" className="block text-sm font-semibold text-gray-700">
              Valor de Venta
            </label>
            <input
              id="valorVenta"
              type="number"
              value={valorVenta}
              onChange={(e) => setValorVenta(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ingresa el nuevo valor de venta"
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              id="manejaIva"
              type="checkbox"
              checked={manejaIva}
              onChange={(e) => setManejaIva(e.target.checked)}
              className="mr-2 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <label htmlFor="manejaIva" className="text-sm font-semibold text-gray-700">
              ¿Maneja IVA?
            </label>
          </div>
          {manejaIva && (
            <div className="mb-6">
              <label htmlFor="porcentajeIva" className="block text-sm font-semibold text-gray-700">
                % de IVA
              </label>
              <input
                id="porcentajeIva"
                type="number"
                value={porcentajeIva}
                onChange={(e) => setPorcentajeIva(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Ingresa el nuevo porcentaje de IVA"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="
              w-full 
              bg-green-600
              text-white py-3 rounded-lg font-semibold hover:bg-green-700
              focus:ring-4 focus:ring-green-300 transition-all duration-300
              shadow-md hover:shadow-lg
            "
          >
            Actualizar Producto
          </button>
        </form>
      </div>
    </main>
  );
}
