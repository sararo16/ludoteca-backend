
//este archivo impplementa el servicio de prestamos
import Prestamo from '../schemas/prestamo.schema.js';

//obtiene todos los prestamos registrados 
export const getPrestamo = async () => {

    //devuelve todos los documentos de prestamo
return await Prestamo.find()
//populate para traer todos los datos completos del juego y del cliente
.populate('game')
.populate('client');
}

//crea un prestamo en la bd
export const createPrestamo = async (prestamoData) => {
//crea una instancia de prestqamo con los datos recibidos 
const prestamo = new Prestamo(prestamoData);
return await prestamo.save();
}
//elimina un prestamo por su id
export const deletePrestamo = async (id) => {
return await Prestamo.findByIdAndDelete(id);
}