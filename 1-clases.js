class Usuario{
    constructor(nombre,apellido){
        this.nombre= nombre;
        this.apellido=apellido;
        this.libros=[];
        this.mascotas=[];
    }
    getFullName(){
        return console.log(`Su nombre es ${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return console.log(this.mascotas.length)
    }
    addBook(nombreLibro, autorLibro){
        this.libros.push({nombre: nombreLibro, autor: autorLibro});
    }
    getBooks(){
        const nuevoArray = [];
        this.libros.map(el=>{
            nuevoArray.push(el.nombre);
        })
        return console.log(nuevoArray);
    }
}

const usuario1 = new Usuario("Matías","Mustafá");

usuario1.getFullName();
usuario1.addMascota("Perro");
usuario1.addMascota("Gato");
usuario1.addMascota("Pato");
usuario1.countMascotas();
usuario1.addBook("Harry Potter","J. K. Rowling");
usuario1.addBook("El señor de los anillos","J. R. R. Tolkien");
usuario1.getBooks();
