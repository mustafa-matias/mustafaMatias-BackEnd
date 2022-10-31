const { Router } = require('express');

const bienvenido = require('./bienvenido');
const upload = require('./upload');
const productosRouter = require('./productos');
const rutaPrincipal = Router();

rutaPrincipal.use('/', bienvenido);
rutaPrincipal.use('/upload/productos', upload);
rutaPrincipal.use('/productos', productosRouter);

module.exports = rutaPrincipal;