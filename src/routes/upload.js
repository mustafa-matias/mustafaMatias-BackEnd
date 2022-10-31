const express = require('express');
const path = require('path');

const upload = express();
upload.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
upload.set('view engine', 'ejs');
upload.set('views', viewsFolderPath);

upload.get('/', async (req, res) => {
    res.render('formulario');
})

module.exports = upload;
