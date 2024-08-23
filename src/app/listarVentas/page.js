'use client';

import { useState, useEffect } from 'react';

export default function ListarVentas() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    // Simulación de fetch para obtener las ventas
    const fetchVentas = async () => {
      // Puedes cambiar la URL al endpoint real de tu API
      const response = await fetch('/api/ventas');
      const data = await response.json();
      setVentas(data);
    };

    fetchVentas();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 p-6">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Listado de Ventas</h2>
        {ventas.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-indigo-700 text-white text-left">
                <th className="py-3 px-4">Consecutivo</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Total Venta</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((venta) => (
                <tr key={venta.consecutivo} className="border-b border-gray-200 hover:bg-indigo-100">
                  <td className="py-3 px-4">{venta.consecutivo}</td>
                  <td className="py-3 px-4">{new Date(venta.fecha).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{venta.cliente}</td>
                  <td className="py-3 px-4">${venta.totalVenta.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-600">No se han registrado ventas aún.</p>
        )}
      </div>
    </main>
  );
}
