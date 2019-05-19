const express = require('express');
const passport = require('passport');
const router = express.Router();
const ProductsService = require('../../services/products');
const validate = require('../../utils/middlewares/validationHandler');
const {productIdSchema, productTagSchema, createProductSchema, updateProductSchema} = require('../../utils/schemas/products');

//JWT Strategy
require('../../utils/auth/strategies/jwt');

//Instanciamos el objeto
const productsService = new ProductsService();

router.get('/', async (request, respond, next) => {

    const {tags} = request.query;

    try
    {
        //Simula un error para probar los handlers
        // throw new Error('This is an error');

        const products = await productsService.getProducts({tags});
        respond.status(200).json({data: products, message: 'Products listed'});

    }catch(error)
    {
        next(error);
    }
    
});

router.get('/:id', async (request, respond, next) => {

    const {id} = request.params;

    try
    {
        const product = await productsService.getProduct({id});
        respond.status(200).json({data: product, message: 'Product retrieved'});

    }catch(error)
    {
        next(error);
    }
    
});

//Usa un middleware para validar que el elemento del cuerpo venga correctamente
router.post('/', validate(createProductSchema), async (request, respond, next) => {
    const {body: product} = request;

    try
    {
        const createProduct = await productsService.createProduct({product});
        respond.status(201).json({data: createProduct, message: 'Product created'});

    }catch(error)
    {
        next(error);
    }
    
});

//Valida el id y el cuerpo de la peticion (Revisa primero el id en los parametros y despues el cuerpo del objeto a actualizar)
router.put('/:id', passport.authenticate('jwt', {session: false}), validate({id: productIdSchema}, "params"), validate(updateProductSchema), async (request, respond, next) => {
    
    const {id} = request.params;
    const {body: product} = request;

    try
    {
        const updateProduct = await productsService.updateProduct({id, product});
        respond.status(200).json({data: updateProduct, message: 'Product updated'});
    }catch(error)
    {
        next(error);
    }
    
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), async (request, respond, next) => {
    const {id} = request.params;
    try
    {
        const product = await productsService.deleteProduct({id});
        respond.status(200).json({data: product, message: 'Product deleted'});

    }catch(error)
    {
        next(error);
    }
    
});

//Exporta las rutas
module.exports = router;