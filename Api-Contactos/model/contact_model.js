// Extension de mongoose
const mongoose = require("mongoose");
// Definicion de la coleccion de la base de datos
const contactSchema = new mongoose.Schema(
    {
        first_name: {
            type: String, 
            required:[true, "EL nombre es obligatorio"], 
            trim: true,   
            minlength: [2, "El nombre debe tener al menos dos caracteres"],
            maxlength: [50,"El nombre no debe de rebasar los 50 caracteres"],
        },
        

    }

);