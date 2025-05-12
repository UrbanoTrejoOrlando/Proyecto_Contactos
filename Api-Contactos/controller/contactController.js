// Obtener en una variable los servicios de la api
const contactServices = require("../services/contactServices");

// Peticion para crear un nuevo contacto
const createContact = async (req, res) =>{
    try {
        // Guardar los datos del body en una variable
        const contactData = req.body;
        // Crear al contacto
        const newContact = await contactServices.CreateContact(contactData);
        // Configuracion del json
        res.status(201).json({
            message: "Contacto creado correctamente",
            user: newContact,
        });
    } catch (error) {
        // Mensaje de error por si algo falla
        res.status(400).json({
            error: error.message,
        });
    }
};

// Peticion para obtener todos los contactos
const getAllContact = async (req,res)=>{
    try {
         // Obtener todos los contactos
        const contacts = await contactServices.GetAllContact();
        // Configuracion del json
        res.status(200).json(contacts);

    } catch (error) {
        // Mensaje de error por si algo falla
        res.status(400).json({
            error: ("Error fallo la conexion " + error.message),
        });   
    }    
};

// Peticion para obtener un contacto por el id
const getContactById = async(req,res)=>{
    const {contactid} = req.params;
    try {
        const contact = await contactServices.GetContactById(contactid);
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });   
    }
};

// Peticion para actualizar un contacto 
const updateContact = async (req, res) =>{
    const {contactid} = req.params;
    const contactData = req.body;
    try {
        const updatecontact = await contactServices.UpdateContactById(contactid, contactData);
        res.status(201).json({
            message: "Contacto actualizado correctamente",
            user: updatecontact,
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
        }); 
    }
};


// Peticion para eliminar un contacto
const deleteContact = async (req,res) =>{
    const {contactid} = req.params;
    try {
        const deletedcontact = await contactServices.DeleteContact(contactid);
        res.status(201).json({
            message: "Contacto eliminado",          
        })
    } catch (error) {
        res.status(400).json({
            error: error.message,
        }); 
    }
};

// Exportacion de las peticiones para que se utilizen en otras partes del proyecto
module.exports = {createContact,getAllContact,getContactById,updateContact,deleteContact};