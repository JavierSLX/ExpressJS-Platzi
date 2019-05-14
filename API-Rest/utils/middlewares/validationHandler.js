function validate(data, schema)
{
    return false;
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