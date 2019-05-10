const productsMocks = require('../utils/mocks/products');

class ProductsService
{
    constructor()
    {

    }

    getProducts({tags})
    {
        return Promise.resolve(productsMocks);
    }

    getProduct({id})
    {
        return Promise.resolve(productsMocks[0]);
    }

    createProduct({product})
    {
        return Promise.resolve(productsMocks[0]);
    }

    updateProduct({id, product})
    {
        return Promise.resolve(productsMocks[0]);
    }

    deleteProduct({id})
    {
        return Promise.resolve(productsMocks[0]);
    }
}

module.exports = ProductsService;