import React from 'react'
import { UserRound, CircleUserRound } from 'lucide-react'

const Registrar = () => {
  return (
    <div className="flex items-center justify-center ">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Registrar Contacto</h2>
        
        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
          <CircleUserRound className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="text"
            placeholder="Nombre"
            required  
            className="w-full outline-none"
          />
        </div>

        <div className="mb-4 flex items-center border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-green-400">
          <UserRound className="text-gray-400 w-5 h-5 mr-3" />
          <input 
            type="text"
            placeholder="Apellido"
            required  
            className="w-full outline-none"
          />
        </div>
        
        <div className="mb-4">
          <input 
            type="email"
            placeholder="Email"
            required  
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        
        <div className="mb-4">
          <input 
            type="tel"
            placeholder="Teléfono"
            required  
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        
        <div className="mb-6">
          <input 
            type="text"
            placeholder="Dirección"
            required  
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          Registrar
        </button>
      </form>
    </div>
  )
}

export default Registrar
