
//este archivo agrupa todas las rutas de clientes
import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient} from '../controllers/client.controller.js';
//router dedicado a clientes
const clientRoutes=Router();
//lista todos los clientes
clientRoutes.get('/' ,getClients);
//crea un cliente nuevo
clientRoutes.put('/', createClient);
//actualiza un cliente existente por su id
clientRoutes.put('/:id', updateClient);
//elimina un cliente por su id
clientRoutes.delete('/:id',deleteClient);

export default clientRoutes;
