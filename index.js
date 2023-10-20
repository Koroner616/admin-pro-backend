const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config');

// Crear servidor Express
const app = express();

// Base de datos
dbConnection();

// Configurar CORS (use es un Middleware)
app.use( cors() );

// Lectura y parseo del body
app.use( express.json());

//Rutas Middleware de rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));


app.listen( process.env.PORT, () =>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
} );