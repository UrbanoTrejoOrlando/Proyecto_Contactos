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
    throw new Error("Error al crear el libro" + error.message);

    }
};



