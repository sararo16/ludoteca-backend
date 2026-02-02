//define el servicio de autores, encapsula la logica de negocio
import AuthorModel from '../schemas/author.schema.js';
import { getGame } from './game.service.js';

//obtiene todos los autores ordenados por nombre o id
export const getAuthors = async () => {
    try {
        return await AuthorModel.find().sort('id');
    } catch (e) {
        throw Error('Error fetching authors');
    }
}

//crea un autor con validacion de esquema
export const createAuthor = async (data) => {
    const { name, nationality } = data;
    try {
        const author = new AuthorModel({ name, nationality });
        return await author.save();
    } catch (e) {
        throw Error('Error creating author');
    }
}

//actualiza un autor por id y devuelve el documento actualizado
export const updateAuthor = async (id, data) => {
    try {
        //verifica existencia primero 
        const author = await AuthorModel.findById(id);
        if (!author) {
            throw Error('There is no author with that Id');
        }    
        return await AuthorModel.findByIdAndUpdate(id,
            data);
        
    } catch (e) {
        throw Error(e);
    }
}
//elimina un autor si no tiene juegos relacionados 
export const deleteAuthor = async (id) => {
    try {
        const author = await AuthorModel.findById(id);
        if (!author) {
            throw 'There is no author with that Id';
        }
        //busca juegos relacionados por el campo autor
        const games = await getGame({author});
        if(games.length > 0) {
            throw 'There are games related to this author';
        }
        return await AuthorModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error(e);
    }
}
//lista autires paginados
export const getAuthorsPageable = async (page, limit, sort) => {
    const sortObj = {
        [sort?.property || 'name']: sort?.direction === 'desc' ? 'desc' : 'asc'
    };
    try {
       const options = {
            page: parseInt(page) + 1,
            limit,
            sort: sortObj
        };

        return await AuthorModel.paginate({}, options);
    } catch (e) {
        throw Error('Error fetching authors page');
    }    
}
//obtiene un autor por id
export const getAuthor = async (id) => {
    try {
        return await AuthorModel.findById(id);
    } catch (e) {
        throw Error('There is no author with that Id');
    }
}