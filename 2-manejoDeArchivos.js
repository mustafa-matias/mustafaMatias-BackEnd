const fs = require('fs');

const leerArchivo = async (nombre) => {
    try {
        const lectura = await fs.promises.readFile(`./${nombre}`, 'utf-8');
        const datos = JSON.parse(lectura)
        return datos;
    } catch (err) {
        throw Error(err);
    }
}

const crearArchivo = async (nombre, dato) => {
    try {
        await fs.promises.writeFile(`./${nombre}`, dato, 'utf-8');
    } catch (err) {
        throw Error(err);
    }
}

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

const archivo1 = new Contenedor('entregable.json');
const productoNuevo = { title: "pelota", price: 2200 }
// archivo1.save(productoNuevo)
// archivo1.getById(2)
// archivo1.getAll()
// archivo1.deleteById(3)
// archivo1.deleteAll()