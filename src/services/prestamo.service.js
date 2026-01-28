import Prestamo from '../schemas/prestamo.schema.js';

export const getPrestamo = async () => {

return await Prestamo.find()
.populate('game')
.populate('client');
}

export const createPrestamo = async (prestamoData) => {
const prestamo = new Prestamo(prestamoData);
return await prestamo.save();
}

export const deletePrestamo = async (id) => {
return await Prestamo.findByIdAndDelete(id);
}