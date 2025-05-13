// Variable para definir el modelo de base de datos
const Contactos = require("../model/contactModel");

//Funcion para crear un contacto
const CreateContact = async (data)=>{
    try{
        // Creacion del libro
        const newContact = new Contactos(data);
        // Guardar el regsitro en la base de datos
        await newContact.save()
        // Retornar el nuevo contacto
        return newContact;

    }catch(error){  
        // Mensaje de errro si algo falla
        throw new Error("Error al crear el contacto" + error.message);

    }
};

// Funcion para obtener un contacto
const GetAllContact = async() =>{
    try{
        // Obtener el contacto
        const contacts = await Contactos.find();
        // Retornar contactos
        return contacts;

    }catch(error){
        // Mensaje de errro si algo falla
        throw new Error("Error al obtener el contacto" + error.message);
    }
    
};

// Funcion para obtener un contacto por su Id
const GetContactById = async(contactid)=>{
    try {
        // Obtencion del contacto
        const contact = await Contactos.findById(contactid);
        // Validar si el contacto existe 
        if(!contact) throw new Error("El contacto no existe "+ error.message);
        // retorna el contacto
        return contact;

    } catch (error) {
        // Mensaje de errro si algo falla
        throw new Error("Error al obtener el contacto" + error.message);
    }
};

// Funcion para actualizar un contacto
const UpdateContactById = async (contactid, data)=>{
    try {
        const updateContact = await Contactos.findByIdAndUpdate(
            contactid,
            data,
            {new: true} // Retorna el documento actualizado
 
        );
        if(!updateContact) throw new Error("El contacto no existe");
        // retorna el contacto
        return updateContact;
        
    } catch (error) {
        // Mensaje de errro si algo falla
        throw new Error("Error al actualizar el contacto " + error.message);
    }
};

// Funcion para eliminar un contactoc
const DeleteContact = async(contactid)=>{
    try {
        
        const deletecontact = await Contactos.findByIdAndDelete(contactid);
        if(!deletecontact) throw new Error("El contacto no existe");
        // Retorna el contacto
        return deletecontact;
      
    } catch (error) {
        // Mensaje de errro si algo falla
        throw new Error("Error al actualizar al contacto" + error.message);
    }
};

//Exportacion de funciones
module.exports = {CreateContact,GetAllContact,GetContactById,UpdateContactById,DeleteContact};


