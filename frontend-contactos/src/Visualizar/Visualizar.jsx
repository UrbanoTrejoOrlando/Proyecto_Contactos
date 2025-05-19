import React, { useEffect } from 'react'
import { URL } from '../common/server';
import { UserPen, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const Visualizar = () => {
  // Creacion de variables de estados
  const [contactos, setContactos] = React.useState([]);
  const [busqueda, setBusqueda] = React.useState("");

  //Funcion para obtener la lista de contactos desde el back
  const obtenerContactos = async () => {
    // Obtener datos de la URL
    const response = await fetch(URL);
    // Verificar si los datos se obtuevieron correctamente
    if (response.status === 200) {
      // Convierte los datos a json
      const contactos = await response.json();
      setContactos(contactos);
      console.log(contactos);
    }
  }

  // Llamar a la función con useEffect
  useEffect(() => {
    obtenerContactos();
  }, []);

  // Funcion para filtrar los productos por el nombre
  const FiltrarProductos = contactos.filter(contacto =>
    contacto.first_name.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Funcion para eliminar un contacto por el id
  const EliminarContactos = async (id) => {
    const confirmacion = await Swal.fire({
      title: '¿Eliminar contacto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    });
    if (confirmacion.isConfirmed) {
      try {
        const response = await fetch(`${URL}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          setContactos(contactos.filter((contacto) => contacto._id !== id))
          await Swal.fire({
            title: 'Eliminada',
            text: 'El contacto fue eliminado',
            icon: 'success',
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            timerProgressBar: true
          });
  
        }
      } catch (error) {
        console.error("Error al eliminar contacto:", error);
        await Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el contacto',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          position: 'top-end',
          timerProgressBar: true,
        });
      }
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Lista de Contactos</h2>

        <input
          type="text"
          placeholder="Buscar contacto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 mb-4 w-full max-w-4xl rounded-md shadow-sm focus:ring focus:ring-blue-300"
        />

        <table className="w-full max-w-6xl border-collapse border text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Apellidos</th>
              <th className="border p-2">Correo Electrónico</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Dirección</th>
              <th className="border p-2 text-center">Editar</th>
              <th className="border p-2 text-center">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {FiltrarProductos.map((contacto) => (
              <tr key={contacto._id} className="border hover:bg-gray-100 transition duration-200">
                <td className="border p-2">{contacto.first_name}</td>
                <td className="border p-2">{contacto.last_name}</td>
                <td className="border p-2">{contacto.email}</td>
                <td className="border p-2">{contacto.phone}</td>
                <td className="border p-2">{contacto.address}</td>
                <td className="border p-2 text-center align-middle">
                  <UserPen
                    className="text-blue-500 cursor-pointer hover:text-blue-700 mx-auto"
                    size={20}
                  />
                </td>
                <td className="border p-2 text-center">
                  <Trash2
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    size={20}
                    onClick={() => EliminarContactos(contacto._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Visualizar;
