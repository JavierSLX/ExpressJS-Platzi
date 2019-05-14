const {config} = require('../../config');

function logErrors(error, request, response, next)
{
    console.log(error.stack);

    //Manda llamar al siguiente middleware
    next(error);
}

//Manejador de errores del cliente
function clientErrorHandler(error, request, response, next)
{
    //Catch errors for AJAX request
    if(request.xhr)
        response.status(500).json({error: error});
    else
        next(error);
}

function errorHandler(error, request, response, next)
{
    //Catch errors while streaming
    if(response.headersSent)
        next(error);

    if(!config.dev)
        delete error.stack;

    response.status(error.status || 500);
    response.send(error);
}

module.exports = {logErrors, clientErrorHandler, errorHandler};