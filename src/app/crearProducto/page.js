'use client';

import { useState } from 'react';

export default function CrearProducto() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [valorVenta, setValorVenta] = useState('');
  const [manejaIva, setManejaIva] = useState(false);
  const [porcentajeIva, setPorcentajeIva] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const producto = {
      codigo: parseInt(codigo, 10),
      nombre,
      valor: parseFloat(valorVenta),
      tieneIva: manejaIva,
      iva: manejaIva ? parseFloat(porcentajeIva) : 0
    };

    try {
      const token = localStorage.getItem('token'); // Obtener el token del local storage
      const response = await fetch('http://localhost:9090/api/v1/producto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluir el token en el header
        },
        body: JSON.stringify(producto)
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage('Producto creado con éxito');
        setModalVisible(true);
        // Limpiar los campos del formulario
        setCodigo('');
        setNombre('');
        setValorVenta('');
        setManejaIva(false);
        setPorcentajeIva('');
      } else {
        const error = await response.json();
        setModalMessage(`Error al crear producto: ${error.message}`);
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage(`Error en la solicitud: ${error.message}`);
      setModalVisible(true);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-600 to-blue-500 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
          Crear Producto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="codigo" className="block text-sm font-semibold text-gray-800">
              Código
            </label>
            <input
              id="codigo"
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ingresa el código del producto"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="nombre" className="block text-sm font-semibold text-gray-800">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ingresa el nombre del producto"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="valorVenta" className="block text-sm font-semibold text-gray-800">
              Valor de Venta
            </label>
            <input
              id="valorVenta"
              type="number"
              value={valorVenta}
              onChange={(e) => setValorVenta(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="Ingresa el valor de venta"
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
            <label htmlFor="manejaIva" className="text-sm font-semibold text-gray-800">
              ¿Maneja IVA?
            </label>
          </div>
          {manejaIva && (
            <div className="mb-6">
              <label htmlFor="porcentajeIva" className="block text-sm font-semibold text-gray-800">
                % de IVA
              </label>
              <input
                id="porcentajeIva"
                type="number"
                value={porcentajeIva}
                onChange={(e) => setPorcentajeIva(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Ingresa el porcentaje de IVA"
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
            Registrar Producto
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg text-black font-semibold mb-4">{modalMessage}</h3>
            <button
              onClick={() => setModalVisible(false)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
