import React from 'react'
import { UserRound, CircleUserRound, Mail, Phone, MapPinHouseIcon } from 'lucide-react'
import { URL } from '../common/server'
import Swal from 'sweetalert2'

// Recibe la función obtenerDatos desde props
const Registrar = ({ obtenerDatos }) => {
  // Creacion de variables de estados
  const [nombre, setNombre] = React.useState("");
  const [apellidos, setApellidos] = React.useState("");
  const [correo, setCorreo] = React.useState("");
  const [telefono, setTelefono] = React.useState(""); 
  const [direccion, setDireccion] = React.useState("");

  // Funcion para poder hacer las diferentes solicitudes
  const cargarDatos = async (contactos)=> {
    //Conexion con la api perteneciente al back
    const response = await fetch(URL, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      // Convierte el cuerpo del body a json
      body: JSON.stringify(contactos)
    });

    // Verificar que si el contacto se creo correctamente con Sweetalert
    if (response.status === 201){
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registro exitoso",
        text: "Tu contacto ha sido registrado correctamente",
        showConfirmButton: false,
        timer: 1500
      });

      // Llamada a la funcion para refrescar datos actualizados
      obtenerDatos(); 
    }
  }

  // Funcion para cargar los datos del formulario hacia el backend
  const eventoFormulario = (evt)=>{
    evt.preventDefault();  
    // Objeto para el nuevo contacto
    const nuevoContacto = {
      first_name : nombre,
      last_name: apellidos,
      email: correo,
      phone: telefono,
      address: direccion,
    }

    // Enviar la solicitud al backend
    cargarDatos(nuevoContacto);

    // Limpiar los campos del formulario
    setNombre("");
    setApellidos("");
    setCorreo("");
    setTelefono("");
    setDireccion("");
  }

  return (
    <div className="flex items-center justify-center pt-0">
      <form onSubmit={eventoFormulario} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registrar Contacto</h2>
        
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <CircleUserRound className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="text"
            placeholder="Nombre"
            onChange={(evt)=>setNombre(evt.target.value)}
            value={nombre}
            required  
            className="w-full outline-none"
          />
        </div>

        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <UserRound className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="text"
            placeholder="Apellido"
            onChange={(evt)=>setApellidos(evt.target.value)}
            value={apellidos}
            required  
            className="w-full outline-none"
          />
        </div>
        
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <Mail className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="email"
            placeholder="Email"
            onChange={(evt)=>setCorreo(evt.target.value)}
            value={correo}
            required  
            className="w-full outline-none"
          />
        </div>
        
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <Phone className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="tel"
            placeholder="Teléfono"
            onChange={(evt)=>setTelefono(evt.target.value)}
            value={telefono}
            required  
            className="w-full outline-none"
          />
        </div>
        
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <MapPinHouseIcon className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="text"
            placeholder="Dirección"
            onChange={(evt)=>setDireccion(evt.target.value)}
            value={direccion}
            required  
            className="w-full focus:outline-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          Registrar
        </button>
      </form>
    </div>
  )
}

export default Registrar;
