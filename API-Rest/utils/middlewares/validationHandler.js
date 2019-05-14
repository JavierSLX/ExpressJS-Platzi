const joi = require('joi');

function validate(data, schema)
{
    const {error} = joi.validate(data, schema);
    return error;
}

function validationHandler(schema, check = 'body')
{
    return function(request, response, next)
    {
        const error = validate(request[check]);
        error ? next(new Error(error)) : next();
    };
}

module.exports = {validate, validationHandler};