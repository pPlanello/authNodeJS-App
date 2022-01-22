const express = require('express');
const cors = require('cors');

// Create server with express
const app = express();

// CORS
app.use( cors() );

// Read and parse body
app.use( express.json() );

// Routes
app.use( '/api/auth', require('./routes/auth') );

app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${ 4000 }`)
});