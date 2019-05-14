const express = require('express');
const productsApiRouter = require('./routes/api/products');
const app = express();
const bodyParser = require('body-parser');

//Permite procesas datos tipo JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Especifica las rutas de la API
app.use('/api/products', productsApiRouter);

const server = app.listen(3000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}...`);
});