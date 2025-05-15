import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div className="mb-6 flex items-center space-x-4 justify-center">
        <img
          className="size-12 shrink-0"
          src="https://img.icons8.com/plasticine/100/agenda.png"
          alt="Icono de agenda"
        />
        <h1 className="text-2xl font-bold text-blue-600 tracking-tight sm:text-4xl">
          Lista de Contactos
        </h1>
      </div>

    
      <div className="flex justify-center mb-6">
        <nav className="inline-flex overflow-hidden rounded-lg border border-gray-300">
          <Link
            to="/registrar"
            className="px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-blue-900 border-r border-gray-300"
          >
            Registrar
          </Link>
          <Link
            to="/visualizar"
            className="px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-blue-900"
          >
            Visualizar
          </Link>
        </nav>
      </div>

      <div className="px-4">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
