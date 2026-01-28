import { Router } from 'express';
import { getPrestamo, createPrestamo, updatePrestamo, deletePrestamo} from '../controllers/prestamo.controller.js';

const prestamoRoutes=Router();

prestamoRoutes.get('/' ,getPrestamo);
prestamoRoutes.post('/',createPrestamo);
prestamoRoutes.put('/:id', updatePrestamo);
prestamoRoutes.delete('/:id',deletePrestamo);

export default prestamoRoutes;
