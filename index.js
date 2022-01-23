const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

// Create server with express
const app = express();

// Connection DB
dbConnection();

// Directory public
app.use( express.static('public'));

// CORS
app.use( cors() );

// Read and parse body
app.use( express.json() );

// Routes
app.use( '/api/auth', require('./routes/auth') );

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
});