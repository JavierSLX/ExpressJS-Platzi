const express = require('express');
const productsApiRouter = require('./routes/api/products');
const app = express();
const bodyParse = require('body-parse');

//Especifica las rutas de la API
app.use('/api/products', productsApiRouter);

//Permite procesas datos tipo JSON
app.use(bodyParse.json());

const server = app.listen(3000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}...`);
});