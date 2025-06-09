import React, { useEffect } from 'react'
import { URL } from '../common/server';
import { UserPen, Trash2, Save, UserSearch } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Visualizar = () => {
  // Creacion de variable para redireccionar al siguiente icono editar
  const navegar = useNavigate();
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

  // Funcion para filtrar los contactos por el nombre
  const FiltrarContactos = contactos.filter(contacto =>
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

  // Generar el pdf con la libreria jspdf
  const DescargarPDF = () => {
    const doc = new jsPDF();

    //Obtener la fecha actual
    const today = new Date();
    const formattedDate = today.toLocaleDateString("es-ES");

    // Diseño del titulo
    doc.setFontSize(18);
    doc.setTextColor("#e11d48");
    doc.text("Lista de Contactos - " + formattedDate, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Nombre", "Apellidos", "Email", "Telefono", "Direccion"]],
      body: FiltrarContactos.map((contact) => {
        return [
          contact.first_name,
          contact.last_name,
          contact.email,
          contact.phone,
          contact.address
        ];
      }),
      styles: {
        fontSize: 12
      },
      headStyles: {
        fillColor: [244, 63, 94],
        textColor: [255, 255, 255],
        halign: "center",
      },
      bodyStyles: {
        halign: "center"
      },


    })
    doc.save(`reporte-${formattedDate}.pdf`)
  }


  return (
    <>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Lista de Contactos</h2>

        <div className="flex items-center gap-2 mb-4 w-full max-w-4xl">
          <div className="relative w-full">
            <UserSearch className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400" />
            <input
              type="text"
              placeholder="Buscar contacto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border p-2 pl-10 w-full rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            onClick={DescargarPDF}
            className="bg-blue-500 text-white px-4 py-2 rounded-md 
              hover:bg-blue-600 transition duration-200"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>

        <table className="w-full max-w-6xl border-collapse border 
          text-left bg-white shadow-md rounded-lg overflow-hidden">
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
            {FiltrarContactos.map((contacto) => (
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
                    onClick={() => navegar(`/editar/${contacto._id}`)}
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
