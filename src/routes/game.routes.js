//define todas las rutas relacionadas con juegos
import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields.js';
import { createGame, getGames, updateGame } from '../controllers/game.controller.js';
//router dedicado a juegos
const gameRouter = Router();

//actualiza un juego existente por su id
gameRouter.put('/:id', [
    check('title').not().isEmpty(),
    check('age').not().isEmpty(),
    check('age').isNumeric(),
    check('category.id').not().isEmpty(),
    check('author.id').not().isEmpty(),
    validateFields
], updateGame);

//crea un nuevo juego
gameRouter.put('/', [
    check('title').not().isEmpty(),
    check('age').not().isEmpty(),
    check('age').isNumeric(),
    check('category.id').not().isEmpty(),
    check('author.id').not().isEmpty(),
    validateFields
], createGame);

//lista juegos 
gameRouter.get('/', getGames);

export default gameRouter;
