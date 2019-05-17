const boom = require('boom');
const {config} = require('../../config');
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi');

function withErrorStack(error, stack)
{
    if(config.dev)
        return {...error, stack} // = Object.assign({}, error, stack)
}

function logErrors(error, request, response, next)
{
    console.log(error.stack);

    //Manda llamar al siguiente middleware
    next(error);
}

function wrapErrors(error, request, respond, next)
{
    if(!error.isBoom)
    {
        next(boom.badImplementation(error));
    }

    next(error);
}

//Manejador de errores del cliente
function clientErrorHandler(error, request, response, next)
{
    const {output: {statusCode, payload}} = error;


    //Catch errors for AJAX request or if an error ocurrs while streaming
    if(isRequestAjaxOrApi(request) || resizeBy.headersSent)
        response.status(statusCode).json(withErrorStack(payload, error.stack));
    else
        next(error);
}

function errorHandler(error, request, response, next)
{
    const {output: {statusCode, payload}} = error;

    response.status(statusCode);
    response.send(withErrorStack(payload, error.stack));
}

module.exports = {logErrors, clientErrorHandler, errorHandler, wrapErrors};