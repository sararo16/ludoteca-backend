import { Router } from 'express';
import { getClients, createClient, updateClient, deleteClient} from '../controllers/client.controller.js';

const clientRoutes=Router();

clientRoutes.get('/' ,getClients);
clientRoutes.put('/', createClient);
clientRoutes.put('/:id', updateClient);
clientRoutes.delete('/:id',deleteClient);

export default clientRoutes;
