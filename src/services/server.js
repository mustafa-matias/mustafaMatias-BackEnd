
const express = require('express');
const MainRouter = require('../routes/index')
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', MainRouter);

const viewsFolderPath = path.resolve(__dirname, '../../views');
app.set('view engine', 'ejs');
app.set('views', viewsFolderPath);


module.exports = app;