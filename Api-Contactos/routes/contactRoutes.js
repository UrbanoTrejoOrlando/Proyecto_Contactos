// Importamos express
const express = require("express");
// Creacion del enrutador modular
const router = express.Router();
const contactController = require("../controller/contactController");


// Ruta para crear un contacto
router.post("/contacts", contactController.createContact);
// Ruta para obtener todos los contactos
router.get("/contacts", contactController.getAllContact);
//Ruta para obtener un contacto
router.get("/contacts/:contactid", contactController.getContactById);
// Ruta para obtener el contacot por id
router.put("/contacts/:contactid", contactController.updateContact);
// Exportacion de las rutas
router.delete("/contacts/:contactid", contactController.deleteContact);

// Exportacion de las rutas
module.exports = router;
