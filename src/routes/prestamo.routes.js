
//este archivo define todas las rutas relacionadas con prestamos
import { Router } from 'express';
import { getPrestamo, createPrestamo, updatePrestamo, deletePrestamo} from '../controllers/prestamo.controller.js';

//router especifico para prestamo
const prestamoRoutes=Router();
//obtiene la lista de prestamo
prestamoRoutes.get('/' ,getPrestamo);
//crea un nuevo prestamo
prestamoRoutes.post('/',createPrestamo);
//actualiza un prestamo existente por su id
prestamoRoutes.put('/:id', updatePrestamo);
//elimina un prestamo por su id
prestamoRoutes.delete('/:id',deletePrestamo);

export default prestamoRoutes;
