const express = require('express');
const path = require('path');

const bienvenido = express();
bienvenido.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
bienvenido.set('view engine', 'ejs');
bienvenido.set('views', viewsFolderPath);

bienvenido.get('/', async (req, res) => {
    const data = [
        {
            title: "Productos Disponilbles",
            linkReference: "http://localhost:8080/api/productos"
        },
        {
            title: "Cargar Productos",
            linkReference: "http://localhost:8080/api/upload/productos"
        }
    ]
    res.render('index', { productsViews: data })
})

module.exports = bienvenido;