//este archivo agrupa todas las rutas de categoria
import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields.js';
import { getCategories, createCategory, deleteCategory, updateCategory } from '../controllers/category.controller.js';
//router dedicado a categorias
const categoryRouter = Router();

//actualiza una cateogira por su id, 
//si hay errores de validacion responde 400,
//si no continua
categoryRouter.put('/:id', [
    check('name').not().isEmpty(),
    validateFields
], updateCategory);

//crea una nueva categoria
categoryRouter.put('/', [
    check('name').not().isEmpty(),
    validateFields
], createCategory);

//devuelve la lsta completa de categorias
categoryRouter.get('/', getCategories);
//elimina una categoria por su id
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
