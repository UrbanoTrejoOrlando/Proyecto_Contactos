import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, resolvePath } from 'react-router-dom';
import { URL } from '../common/server';
import { UserRound, CircleUserRound, Mail, Phone, MapPinHouseIcon } from 'lucide-react'
import Swal from 'sweetalert2';

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
  
    // Paso 1: Confirmación antes de actualizar
    const confirmacion = await Swal.fire({
      title: '¿Seguro que quieres actualizar este contacto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    });
  
    // Si el usuario confirmó:
    if (confirmacion.isConfirmed) {
      try {
        const response = await fetch(`${URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contacto)
        });
  
        if (response.ok) {
          await Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'El contacto se actualizó correctamente',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar'
          });
          navigate('/visualizar');
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el contacto. Intenta nuevamente.',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Cerrar'
          });
          console.error('Error al actualizar el contacto');
        }
  
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Error de red',
          text: 'Ocurrió un problema al enviar la solicitud.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Cerrar'
        });
        console.error('Error al enviar la solicitud:', error);
      }
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
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 
            focus-within:ring-2 focus-within:ring-blue-400">
          <Mail className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            name="email"
            value={contacto.email}
            onChange={handleChange}
            className="w-full outline-none"
            placeholder="Correo electrónico"
          />
        </div>
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 
            focus-within:ring-2 focus-within:ring-blue-400">
          <Phone className="text-gray-400 w-5 h-5 mr-3" />
          <input
            type="text"
            name="phone"
            value={contacto.phone}
            onChange={handleChange}
            className="w-full outline-rouder"
            placeholder="Teléfono"
          />
        </div>
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 
            focus-within:ring-2 focus-within:ring-blue-400">
          <MapPinHouseIcon className="text-gray-400 w-5 h-5 mr-3" />
          <input
            name="address"
            value={contacto.address}
            onChange={handleChange}
            className="w-full outline-rouder"
            placeholder="Dirección"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 
          text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default FormularioEditar;
