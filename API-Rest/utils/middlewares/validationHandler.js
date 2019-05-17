const Joi = require('joi');
const boom = require('boom');

function validate(data, schema)
{
    const {error} = Joi.validate(data, schema);
    return error;
}

function validationHandler(schema, check = 'body')
{
    return function(request, response, next)
    {
        const error = validate(request[check], schema);
        error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = validationHandler;