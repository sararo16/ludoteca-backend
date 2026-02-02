
//este archvio agrupa todas las rutas de autor
import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields.js';
import { createAuthor, deleteAuthor, getAuthors, updateAuthor, getAuthorsPageable } from '../controllers/author.controller.js';

//router dedicado a autores
const authorRouter = Router();

//actualiza un autor existente por ID.
//si hay errores devuelve 400 con el erorr
//si no, llama a updateauthor del controller
authorRouter.put('/:id', [
    check('name').not().isEmpty(),
    check('nationality').not().isEmpty(),
    validateFields
], updateAuthor);

//crea un nuevo autor
authorRouter.put('/', [
    check('name').not().isEmpty(),
    check('nationality').not().isEmpty(),
    validateFields
], createAuthor);

//devuelve la lista completa de autores sin paginar
authorRouter.get('/', getAuthors);
//elimina un autor por su id
authorRouter.delete('/:id', deleteAuthor);

//devuelve autores paginados 
authorRouter.post('/', [
    check('pageable').not().isEmpty(),
    check('pageable.pageSize').not().isEmpty(),
    check('pageable.pageNumber').not().isEmpty(),
    validateFields
], getAuthorsPageable)

export default authorRouter;
