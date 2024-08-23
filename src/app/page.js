'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasenia }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const data = await response.json();
      
      const token = data.jwt; // Ajusta según la estructura de la respuesta
      localStorage.setItem('token', token);

      // Redirige al dashboard principal
      router.push('/mainBoard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Locatel - Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-900"
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="contrasenia" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              id="contrasenia"
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-900"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </main>
  );
}
