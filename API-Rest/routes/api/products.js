const express = require('express');
const router = express.Router();
const productMock = require('../../utils/mocks/products');

router.get('/', (request, respond) => {
    respond.status(200).json({data: productMock, message: 'Products listed'});
});

router.get('/:id', (request, respond) => {

    const {id} = request.params;
    respond.status(200).json({data: productMock[id], message: 'Product retrieved'});
});

router.post('/', (request, respond) => {
    respond.status(201).json({data: productMock[0], message: 'Product created'});
});

router.put('/:id', (request, respond) => {
    respond.status(200).json({data: productMock[0], message: 'Product updated'});
});

router.delete('/:id', (request, respond) => {
    respond.status(200).json({data: productMock[0], message: 'Product deleted'});
});

//Exporta las rutas
module.exports = router;