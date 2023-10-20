const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Crear servidor Express
const app = express();

// Base de datos
dbConnection();

// Configurar CORS use es un Middleware
app.use( cors() );

//Rutas
app.get( '/', (req,res)=>{

    res.json({
        ok:true,
        msg: 'Hola mundo'
    });

} );

app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
} );