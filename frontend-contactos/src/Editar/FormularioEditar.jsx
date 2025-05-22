import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { URL } from '../common/server'; // Asegúrate de que esta ruta esté bien definida

const FormularioEditar = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const navigate = useNavigate();

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
    <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Editar Contacto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="first_name"
          value={contacto.first_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nombre"
        />
        <input
          name="last_name"
          value={contacto.last_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Apellidos"
        />
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
