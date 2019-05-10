const fs = require('fs');

function getKeysFromOptions(options)
{
    const {settings, _locals, ...objectKeys} = options;
    return Object.keys(objectKeys);
}

function getRenderedContent(content, object)
{
    const keys = getKeysFromOptions(object);

    let contentString = content.toString();

    for(let key of keys)
    {
        contentString = contentString.replace(new RegExp(`\{${key}}`, "gi"), object[key]);
    }

    return contentString;
}

function expressJSX(filePath, options, callback)
{
    fs.readFile(filePath, (error, data) => {

        if(error)
            return callback(error);

        const rendered = getRenderedContent(data, options);

        return callback(null, rendered);
    });
}

module.exports = expressJSX;