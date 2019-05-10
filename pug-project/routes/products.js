const express = require('express');
const router = express.Router();

const products = [{name: 'Red Shoes', price: 75}, {name: 'Black Bike', price: '300'}];

router.get('/', (request, respond) => {
    respond.render("products", {products});
});

module.exports = router;