// importacion del paquete de express
const express = require("express");
// importacion del paquete de cors
const cors = require("cors");
// conexion de la base de datos
const {ConnectDB} = require("./data/config");
// importacion de las rutas
const contactRouter = require("./routes/contactRoutes");

// Definicion del puerto 
const PORT = 3500;

// Creacion de la instancia del servidor
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api',contactRouter);
//Agregar la conexion a la base de datos
ConnectDB();

// Ejecucion del servidor
app.listen(PORT, ()=>{
    console.log("Server running in http://localhost:"+PORT)
});