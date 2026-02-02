//este archivo implementa el servicio de juegos, contiene la logica de negocio
import GameModel from '../schemas/game.schema.js';
import { getCategory } from './category.service.js';
import { getAuthor } from './author.service.js';

//obtiene juegos filtrando por titulos o categoria
export const getGames = async (title, category) => {
    try {
        //crea un regex para busquedas por titulo
        const regexTitle = new RegExp(title, 'i');
        const find = category? { $and: [{ title: regexTitle }, { category: category }] } : { title: regexTitle };
        return await GameModel.find(find)
        .sort('_id').
        populate('category').
        populate('author');
    } catch(e) {
        throw Error('Error fetching games');
    }
}
//crea un juego verificando que categoria y autor existan
export const createGame = async (data) => {
    try {
        const category = await getCategory(data.category.id);
        if (!category) {
            throw Error('There is no category with that Id');
        }

        const author = await getAuthor(data.author.id);
        if (!author) {
            throw Error('There is no author with that Id');
        }
        //crea el juego con ids limpios
        const game = new GameModel({
            ...data,
            category: data.category.id,
            author: data.author.id,
        });
        return await game.save();
    } catch (e) {
        throw Error(e);
    }
}

//actualiza un juego verificando su existencia y relaciones
export const updateGame = async (id, data) => {
    try {
        const game = await GameModel.findById(id);
        if (!game) {
            throw Error('There is no game with that Id');
        }

        const category = await getCategory(data.category.id);
        if (!category) {
            throw Error('There is no category with that Id');
        }

        const author = await getAuthor(data.author.id);
        if (!author) {
            throw Error('There is no author with that Id');
        }
        //se arma el objeto de actualizacion
        const gameToUpdate = {
            ...data,
            category: data.category.id,
            author: data.author.id,
        };
        return await GameModel.findByIdAndUpdate(id, gameToUpdate, { new: false });
    } catch (e) {
        throw Error(e);
    }
}

//busca juegos segun un filtro generico
export const getGame = async (field) => {
    try {
        return await GameModel.find(field);
    } catch (e) {
        throw Error('Error fetching games');
    }
}

