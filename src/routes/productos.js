const fs = require('fs');
const express = require('express');
const path = require('path');
const rutaProductos = express();
rutaProductos.use(express.static('public'));

const viewsFolderPath = path.resolve(__dirname, '../../views');
rutaProductos.set('view engine', 'ejs');
rutaProductos.set('views', viewsFolderPath);

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    async save(objeto) {
        try {
            const data = await leerArchivo(this.nombreArchivo);
            if (data.length === 0) {
                objeto.id = 1;
                data.push(objeto);
                const nuevoJson = JSON.stringify(data, null, '\t');
                try {
                    await crearArchivo(this.nombreArchivo, nuevoJson)
                } catch (err) {
                    throw Error(err);
                }
            } else {
                objeto.id = data[(data.length - 1)].id + 1;
                data.push(objeto);
                const nuevoJson = JSON.stringify(data, null, '\t');
                try {
                    await crearArchivo(this.nombreArchivo, nuevoJson)
                } catch (err) {
                    throw Error(err);
                }
            }
        } catch (err) {
            throw Error(err);
        }
    }

    async getById(productoId) {
        try {
            const data = await leerArchivo(this.nombreArchivo);
            const item = data.find((producto) => producto.id === productoId);
            if (item) {
                console.log(item);
                return item;
            } else {
                console.log("No existe ese producto")
            }
        } catch (err) {
            throw Error(err);
        }
    }

    async getAll() {
        try {
            const data = await leerArchivo(this.nombreArchivo);
            console.log(data);
            return data;
        } catch (err) {
            throw Error(err);
        }
    }

    async deleteById(productoId) {
        try {
            const data = await leerArchivo(this.nombreArchivo);
            const item = data.find((producto) => producto.id === productoId);
            const indice = data.indexOf(item);
            data.splice(indice, 1);
            const nuevoJson = JSON.stringify(data, null, '\t');
            try {
                await crearArchivo(this.nombreArchivo, nuevoJson)
            } catch (err) {
                throw Error(err);
            }
        } catch (err) {
            throw Error(err);
        }
    }

    async deleteAll() {
        try {
            await crearArchivo(this.nombreArchivo, '[]');
        } catch (err) {
            throw Error(err);
        }
    }
}

const leerArchivo = async (nombre) => {
    try {
        const lectura = await fs.promises.readFile(`./src/${nombre}`, 'utf-8');
        const datos = JSON.parse(lectura)
        return datos;
    } catch (err) {
        throw Error(err);
    }
}

const crearArchivo = async (nombre, dato) => {
    try {
        await fs.promises.writeFile(`./src/${nombre}`, dato, 'utf-8');
    } catch (err) {
        throw Error(err);
    }
}
const archivo1 = new Contenedor('productos.json');

rutaProductos.get('/', async (req, res) => {
    const productos = await archivo1.getAll();
    res.render('productos', { data: productos })
})

rutaProductos.get('/:id', async (req, res) => {
    const id = JSON.parse(req.params.id);
    const productoId = await archivo1.getById(id);
    if (!productoId) {
        return res.status(400).json({
            msg: `No existe producto id: ${id}`
        })
    }
    res.json({
        data: productoId
    })
})

rutaProductos.post('/', async (req, res) => {
    const data = req.body;
    const { title, price } = req.body;
    if (!title || !price) {
        return res.status(400).json({
            msg: "campos inválidos"
        })
    }
    const nuevoProducto = {
        title,
        price
    }
    await archivo1.save(nuevoProducto);
    res.redirect('/api');
})

rutaProductos.put('/:id', async (req, res) => {
    const productos = await leerArchivo("productos.json");
    const id = JSON.parse(req.params.id);
    const productoId = await archivo1.getById(id);
    if (!productoId) {
        return res.status(400).json({
            msg: `No existe producto id: ${id}`
        })
    }
    const data = req.body;
    const { title, price } = req.body;
    if (!title || !price) {
        return res.status(400).json({
            msg: "campos inválidos"
        })
    }
    const productoActualizado = {
        title,
        price,
        id: id
    }
    const indice = productos.findIndex(producto => producto.id == id);
    productos.splice(indice, 1, productoActualizado);
    archivo1.deleteAll()
    archivo1.save(productos);
    res.json({
        msg: `Se modifico el producto id: ${id}`,
        data: productoActualizado
    })
})

rutaProductos.delete('/:id', async (req, res) => {
    const id = JSON.parse(req.params.id);
    const productoId = await archivo1.deleteById(id);
    res.json({
        msg: `Se borró el producto id: ${id}`
    })
})

rutaProductos.get('/productoRandom', async (req, res) => {
    const data = await leerArchivo(archivo1.nombreArchivo);
    const numeroRamdomMax = data.length;
    const sorteo = (Math.round(Math.random() * (numeroRamdomMax - 1) + 1));
    const producto = await archivo1.getById(sorteo);
    res.send(producto);
})

module.exports = rutaProductos;