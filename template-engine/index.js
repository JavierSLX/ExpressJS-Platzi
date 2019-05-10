const express = require('express');
const app = express();
const expressJSX = require('./express-jsx')

//Template Engine
app.engine('jsx', expressJSX);

//Busca en las vistas
app.set('views', './views');
app.set('view engine', 'jsx');

app.get('/', (request, respond) => {

    //Rennderiza el documento y le pasa los elementos
    respond.render("index", {hello: 'hola', world: 'mundo'});
});

const server = app.listen(8000, () => {
    console.log('Escuchando en puerto 8000...');
});