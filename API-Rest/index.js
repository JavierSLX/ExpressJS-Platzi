const express = require('express');
const bodyParser = require('body-parser');
const boom = require('boom');
const productsApiRouter = require('./routes/api/products');
const {logErrors, clientErrorHandler, errorHandler, wrapErrors} = require('./utils/middlewares/errorsHandlers');
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi');
const authApiRouter = require('./routes/api/auth');
const app = express();

//Permite procesas datos tipo JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Especifica las rutas de la API
app.use('/api/products', productsApiRouter);
app.use('/api/auth', authApiRouter);

//Middleware con 404
app.use((request, response, next) => {
    if(isRequestAjaxOrApi(request))
    {
        const {output: {statusCode, payload}} = boom.notFound();
        response.status(statusCode).json(payload);
    }

    response.status(404).json({error: '404'});
})

//Middlewares de errores se agregan al final
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

const server = app.listen(3000, () => {
    console.log(`Escuchando en el puerto ${server.address().port}...`);
});