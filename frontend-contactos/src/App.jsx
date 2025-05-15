import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout/Layout'
import Registrar from './Registrar/Registrar'
import Visualizar from './Visualizar/Visualizar'


const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Registrar />} /> 
        <Route path="registrar" element={<Registrar />} />
        <Route path="visualizar" element={<Visualizar />} />
        </Route>
      </Routes>
    </Router>
  )
}


export default App
