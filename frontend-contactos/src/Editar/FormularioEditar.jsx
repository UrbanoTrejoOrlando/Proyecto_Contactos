import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URL } from '../common/server';
import { UserRound, CircleUserRound, Mail, Phone, MapPinHouseIcon } from 'lucide-react'

const FormularioEditar = () => {
  // Obtener el ID de la URL
  const { id } = useParams(); 
  const navigate = useNavigate();
  // Funciones de estado para obtener los datos del formulario
  const [contacto, setContacto] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Obtener datos del contacto al montar el componente
  useEffect(() => {
    const obtenerContacto = async () => {
      try {
        const response = await fetch(`${URL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          setContacto(data);
        } else {
          console.error('Error al obtener el contacto');
        }
      } catch (error) {
        console.error('Error en la petición:', error);
      }
    };
    obtenerContacto();
  }, [id]);

  // Manejador de cambios en los campos del formulario
  const handleChange = (e) => {
    setContacto({ ...contacto, [e.target.name]: e.target.value });
  };

  // Enviar datos actualizados
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contacto)
      });

      if (response.ok) {
        navigate('/visualizar'); // Redirige a la lista
      } else {
        console.error('Error al actualizar el contacto');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Editar Contacto</h2>
        
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 
            focus-within:ring-2 focus-within:ring-blue-400">
            <CircleUserRound className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            name="first_name"
            value={contacto.first_name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full outline-none"
          />
        </div>
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 
            focus-within:ring-2 focus-within:ring-blue-400">
            <UserRound className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            name="last_name"
            value={contacto.last_name}
            onChange={handleChange}
            className="w-full outline-none"
            placeholder="Apellidos"
          />
        </div>
        <input
          name="email"
          value={contacto.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Correo electrónico"
        />
        <input
          name="phone"
          value={contacto.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Teléfono"
        />
        <input
          name="address"
          value={contacto.address}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Dirección"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default FormularioEditar;
