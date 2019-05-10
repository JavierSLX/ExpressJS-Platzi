const express = require('express');
const path = require('path');
const app = express();
const productsRouter = require('./routes/products');

//Localiza la carpeta de los views a partir de la carpeta del proyecto
app.set('views', path.join(__dirname, 'views'));

//Especifica que usaremos pug como "view engine"
app.set('view engine', 'pug');

//Cuando se usa router, se especifica que se va a usar
app.use('/products', productsRouter);

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000...');
});