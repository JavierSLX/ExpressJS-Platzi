const {MongoClient, ObjectID} = require('mongodb');
const {config} = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@curso-platzi-i0uq0.mongodb.net/${config.dbName}?retryWrites=true`;
//const MONGO_URI = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;

class MongoLib
{
    constructor()
    {
        //Crea el cliente de Mongo
        this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true});
        this.dbName = config.dbName;
    }

    //Conecta a la base de datos de Mongo y regresa el cliente ya con la DB
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

    //Regresa todos los documentos relacionados a la colección filtrados por un query
    getAll(collection, query)
    {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                return db.collection(collection).find(query).toArray();
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    //Obtiene un elemento por medio de su filtro
    get(collection, id)
    {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                return db.collection(collection).findOne({_id: ObjectID(id)});
            }).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    //Crea un nuevo documento (Encadena promesas para obtener el resultado)
    create(collection, data)
    {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                return db.collection(collection).insertOne(data);
            }).then((result) => {
                resolve(result.insertedId);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    //Actualiza un documento ya existente
    update(collection, id, data)
    {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                return db.collection(collection).updateOne({_id: ObjectID(id)}, {$set: data}, {upsert: true});
            }).then((result) => {
                resolve(result.upsertedId || id);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    //Borra un documento
    delete(collection, id)
    {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                return db.collection(collection).deleteOne({_id: ObjectID(id)});
            }).then(() => {
                resolve(id);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}

module.exports = MongoLib;