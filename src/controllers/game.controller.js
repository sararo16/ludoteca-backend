
//este archivo maneja todas las operaciones relacionadas con juegos

import * as GameService from '../services/game.service.js';

    //obtiene la lista de juegos filtrando titulo y categoria, 
    //si no hay filtros devuelve todos
    export const getGames = async (req, res) => {
        try {
            //si no hay title, se usa string vacio para que no filtre nada
            const titleToFind = req.query?.title || '';
            //si no hay idcategory deja null para que no filtre
            const categoryToFind = req.query?.idCategory || null;
            //llamada a capa de servicio (consulta en bd)
            const games = await GameService.getGames(titleToFind, categoryToFind);
            res.status(200).json(games);
        } catch(err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

    //crear un nuevo juego
    export const createGame = async (req, res) => {
        try {
            const game = await GameService.createGame(req.body);
            res.status(200).json({
                game //devuelve juego recien creado
            });
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

    //actualiza un juego existente segun su id
    export const updateGame = async (req, res) => {
        const gameId = req.params.id; //id del juego a actualizar
        try {
            await GameService.updateGame(gameId, req.body);
            res.status(200).json(1);
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }
