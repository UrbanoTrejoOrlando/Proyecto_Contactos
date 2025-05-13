// Importamos express
const express = require("express");
// Creacion del enrutador modular
const router = express.Router();
const contactController = require("../controller/contactController");

// Definicion de rutas
// Ruta para crear un contacto
router.post("/contacts", contactController.createContact);
// Ruta para obtener todos los contactos
router.get("/contacts", contactController.getAllContact);
//Ruta para obtener un contacto
router.get("/contacts/:contactid", contactController.getContactById);
//Ruta para actualizar un contacto
router.put("/contacts/:contactid", contactController.updateContact);
// Ruta para eliminar un contacto
router.delete("/contacts/:contactid", contactController.deleteContact);


module.exports = router;
