const bycrypt = require('bcrypt');
const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');
const {config} = require('../../config');

//Construye el objeto del usuario a insertar
function buildAdminUser(password)
{
    return {password, username: config.authAdminUsername, email: config.authAdminEmail};
}

//Verifica si el usuario existe en la base de datos
async function hasAdminUser(mongoDB)
{
    const adminUser = await mongoDB.getAll('users', {username: config.authAdminUsername});

    return adminUser && adminUser.length;
}

//Crea el usuario
async function createAdminUser(mongoDB)
{
    const hashedPassword = await bycrypt.hash(config.authAdminPassword, 10);
    const userID = await mongoDB.create('users', buildAdminUser(hashedPassword));

    return userID;
}

//Realiza el proceso
async function seedAdmin()
{
    try
    {
        const mongoDB = new MongoLib();

        if(await hasAdminUser(mongoDB))
        {
            console.log(chalk.yellow('Admin user already exists'));
            return process.exit(1);
        }

        const adminUserId = await createAdminUser(mongoDB);
        console.log(chalk.green('Admin user created with id:', adminUserId));

        return process.exit(0);
    }catch(error)
    {
        console.log(chalk.red(error));
        process.exit(1);
    }
}

seedAdmin();