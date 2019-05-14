const {MongoClient} = require('mongodb');
const {config} = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@curso-platzi-i0uq0.mongodb.net/${config.dbName}?retryWrites=true`;

class MongoLib
{
    constructor()
    {
        //Crea el cliente de Mongo
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true});
        this.dbName = config.dbName;
    }

    connect()
    {
        return new Promise((resolve, reject) => {

            this.client.connect(error => {

                if(error)
                {
                    reject(error);
                    return;
                }

                console.log('Connect to Mongo!');

                //Regresa el cliente conectado a la base de datos
                resolve(this.client.db(this.dbName));
            });
        });
    }

    getAll(collection, query)
    {
        return this.connect().then(db => {

            return db.collection(collection).find(query).toArray();
        }).catch(error => {
            console.log(error);
        });
    }
}

module.exports = MongoLib;