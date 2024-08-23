'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegistrarVenta() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    consecutivo: '',
    fecha: '',
    cliente: '',
    totalVenta: '',
    productos: [{ codigo: '', nombre: '', valor: '', iva: '' }]
  });

  const handleChange = (e) => {
    const { id, value, dataset } = e.target;
    if (dataset.index !== undefined) {
      const index = dataset.index;
      const updatedProductos = [...formData.productos];
      updatedProductos[index][id] = value;
      setFormData((prevData) => ({
        ...prevData,
        productos: updatedProductos
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleAddProducto = () => {
    setFormData((prevData) => ({
      ...prevData,
      productos: [...prevData.productos, { codigo: '', nombre: '', valor: '', iva: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para enviar el formulario a una API
    console.log(formData);
    router.push('/mainBoard'); // Redirigir a la página principal después de registrar la venta
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-teal-400 to-blue-600 p-6">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-8">Registrar Nueva Venta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="consecutivo" className="block text-sm font-semibold text-gray-700">
              Consecutivo
            </label>
            <input
              id="consecutivo"
              type="text"
              value={formData.consecutivo}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
              placeholder="Ingresa el consecutivo de la venta"
              required
            />
          </div>
          <div>
            <label htmlFor="fecha" className="block text-sm font-semibold text-gray-700">
              Fecha
            </label>
            <input
              id="fecha"
              type="date"
              value={formData.fecha}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
              required
            />
          </div>
          <div>
            <label htmlFor="cliente" className="block text-sm font-semibold text-gray-700">
              Cliente
            </label>
            <input
              id="cliente"
              type="text"
              value={formData.cliente}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
              placeholder="Ingresa el nombre o ID del cliente"
              required
            />
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Productos</h3>
            {formData.productos.map((producto, index) => (
              <div key={index} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="codigo" className="block text-sm font-semibold text-gray-700">
                      Código
                    </label>
                    <input
                      id="codigo"
                      type="text"
                      value={producto.codigo}
                      onChange={handleChange}
                      data-index={index}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                      placeholder="Código del producto"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      value={producto.nombre}
                      onChange={handleChange}
                      data-index={index}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                      placeholder="Nombre del producto"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="valor" className="block text-sm font-semibold text-gray-700">
                      Valor
                    </label>
                    <input
                      id="valor"
                      type="number"
                      value={producto.valor}
                      onChange={handleChange}
                      data-index={index}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                      placeholder="Valor del producto"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="iva" className="block text-sm font-semibold text-gray-700">
                      IVA (%)
                    </label>
                    <input
                      id="iva"
                      type="number"
                      value={producto.iva}
                      onChange={handleChange}
                      data-index={index}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                      placeholder="Porcentaje de IVA"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddProducto}
              className="mt-4 w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
            >
              Agregar Otro Producto
            </button>
          </div>
          <div>
            <label htmlFor="totalVenta" className="block text-sm font-semibold text-gray-700">
              Total Venta
            </label>
            <input
              id="totalVenta"
              type="number"
              value={formData.totalVenta}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
              placeholder="Ingresa el total de la venta"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
          >
            Registrar Venta
          </button>
        </form>
      </div>
    </main>
  );
}
