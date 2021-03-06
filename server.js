const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
//para que heroku elija el puerto que tenga libre
let puerto = process.env.PORT;

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

// Escuchemos en un puerto
app.listen(puerto, () => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});