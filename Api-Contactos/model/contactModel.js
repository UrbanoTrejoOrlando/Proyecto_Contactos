// Extension de mongoose
const mongoose = require("mongoose");
// Definicion de la coleccion de la base de datos
const contactSchema = new mongoose.Schema(
    {
        first_name: {
            type: String, 
            required:[true, "EL nombre es obligatorio"], 
            trim: true,   // Elimina espacios
            minlength: [2, "El nombre debe tener al menos dos caracteres"],
            maxlength: [50,"El nombre no debe de rebasar los 50 caracteres"],
        },
        last_name: {
            type: String,
            required: [true, "El segundo apellido es obligatorio"],
            trim: true,
            minlength: [2, "El apellido debe tener al menos dos caracteres"],
            maxlength: [50,"El apellid no debe de rebasar los 50 caracteres"],

        },
        email: {
            type: String,
            required: [true, "El correo debe de ser obligatorio"],
            trim: true,
            unique: true, // Evita duplicar correos
            lowercase: true, // Convierte todos los caracteres a minusculas
            match: [/^\S+@\S+\.\S+$/, 'Por favor, ingresa un correo válido'],
        },
        phone:{
            type: String,
            required: [true, "Es telefono es obligatorio"],
            trim: true,
        },
        address:{
            type: String,
            required: true,
            trim: true,
            minlength: [2, "La direccion debe tener al menos dos caracteres"],
            maxlength: [100,"La direccion no debe de rebasar los 100 caracteres"],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
          },                  
    })

// Exportar el modelo que se creo
module.exports = mongoose.model("Contactos", contactSchema);