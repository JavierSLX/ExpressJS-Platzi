const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

//Instanciamos el objeto
const productsService = new ProductsService();

router.get('/', async (request, respond, next) => {

    const {tags} = request.query;

    try
    {
        const products = await productsService.getProducts({tags});
        respond.status(200).json({data: products, message: 'Products listed'});

    }catch(error)
    {
        next(error);
    }
    
});

router.get('/:id', async (request, respond) => {

    const {id} = request.params;

    try
    {
        const product = await productsService.getProduct({id});
        respond.status(200).json({data: product, message: 'Product retrieved'});

    }catch(error)
    {
        
    }
    
});

router.post('/', async (request, respond) => {
    const {body: product} = request;

    try
    {
        const createProduct = await productsService.createProduct({product});
        respond.status(201).json({data: createProduct, message: 'Product created'});

    }catch(error)
    {
        
    }
    
});

router.put('/:id', async (request, respond) => {
    const {id} = request.params;
    const {body: product} = request;

    try
    {
        const updateProduct = await productsService.updateProduct({id, product});
        respond.status(200).json({data: updateProduct, message: 'Product updated'});
    }catch(error)
    {
        
    }
    
});

router.delete('/:id', async (request, respond) => {
    const {id} = request.params;

    try
    {
        const product = await productsService.deleteProduct({id});
        respond.status(200).json({data: product, message: 'Product deleted'});

    }catch(error)
    {
        
    }
    
});

//Exporta las rutas
module.exports = router;