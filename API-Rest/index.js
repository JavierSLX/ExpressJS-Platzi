const express = require('express');
const bodyParser = require('body-parser');
const productsApiRouter = require('./routes/api/products');
const {logErrors, clientErrorHandler, errorHandler} = require('./utils/middlewares/errorsHandlers');
const app = express();

//Permite procesas datos tipo JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Especifica las rutas de la API
app.use('/api/products', productsApiRouter);

//Middlewares de errores se agregan al final
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(3000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}...`);
});