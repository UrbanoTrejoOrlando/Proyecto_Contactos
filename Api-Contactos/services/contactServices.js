// Variable para definir el modelo de base de datos
const Contactos = require("../model/contactModel");

//Funcion para crear un contacto
export const CreateContact = async (data)=>{
    try{
    // Creacion del libro
    const newContact = new Contactos(data);
    // Guardar el regsitro en la base de datos
    await newContact.save()
    // Retornar el nuevo contacto
    return newContact;

    }catch(error){  
    throw new Error("Error al crear el contacto" + error.message);

    }
};

// Funcion para obtener un contacto
export const GetAllContact = async() =>{
    try{
        // Obtener el contacto
        const contacts = new Contactos.find();
        // Retornar contactos
        return contacts;

    }catch(error){
        throw new Error("Error al obtener el contacto" + error.message);
    }
    
};

// Funcion para obtener un contacto por su Id
export const GetContactById = async(contactid)=>{
    try {
        // Obtencion del contacto
        const contact = new Contactos.findById(contactid);
        // Validar si el contacto existe 
        if(!contact) throw new Error("El contacto no existe "+ error.message);
        // retorna el contacto
        return contact;

    } catch (error) {
        throw new Error("Error al obtener el contacto" + error.message);
    }
};

// Funcion para actualizar un contacto
export const UpdateContactById = async (contactid, data)=>{
    try {
        const updateContact = await Contactos.findByIdAndUpdate(
            contactid,
            data,
            {new: true} // Retorna el documento actualizado
 
        );
        if(!updateContact) throw new Error("El contacto no existe "+ error.message);
        // retorna el contacto
        return updateContact;
        
    } catch (error) {
      throw new Error("Error al actualizar el contacto ", error.message);
    }
};

