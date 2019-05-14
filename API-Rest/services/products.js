const productsMocks = require('../utils/mocks/products');
const MongoLib = require('../lib/mongo');

class ProductsService
{
    constructor()
    {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }

    async getProducts({tags})
    {
        try
        {
            const query = tags && {tags: {$in: tags}};
            const products = await this.mongoDB.getAll(this.collection, query);
            
            //Si los productos no existen regresa un arreglo vacío
            return products || [];
        }catch(error)
        {
            console.log(error);
        }
    }

    async getProduct({id})
    {
        try
        {
            const product = await this.mongoDB.get(this.collection, id);
            return product || {};
        }catch(error)
        {
            console.log(error);
        }
    }

    async createProduct({product})
    {
        try
        {
            const createID = await this.mongoDB.create(this.collection, product);
            return createID;
        }catch(error)
        {
            console.log(error);
        }
    }

    async updateProduct({id, product})
    {
        try
        {
            const updateID = await this.mongoDB.update(this.collection, id, product);
            return updateID;
        }catch(error)
        {
            console.log(error);
        }
    }

    async deleteProduct({id})
    {
        try
        {
            const deleteID = await this.mongoDB.delete(this.collection, id);
            return deleteID;
        }catch(error)
        {
            console.log(error);
        }
    }
}

module.exports = ProductsService;