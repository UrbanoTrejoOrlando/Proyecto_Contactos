import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Registrar from './Registrar/Registrar'
import Visualizar from './Visualizar/Visualizar'
import FormularioEditar from './Editar/FormularioEditar'

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Registrar />} /> 
        <Route path="registrar" element={<Registrar />} />
        <Route path="visualizar" element={<Visualizar />} />
        <Route path="editar/:id" element={<FormularioEditar/>} />

        </Route>
      </Routes>
    </Router>
  )
}


export default App
