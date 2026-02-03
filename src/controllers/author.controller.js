
//este archivo define todas las funciones que responden a las petiones HTTP
//extraen los datos de req
//llama a la capa de servicio para la logica de negocio 

import * as AuthorService from '../services/author.service.js';

//obtiene la lista completa de autores
export const getAuthors = async (req, res) => {
    try {
        const authors = await AuthorService.getAuthors();
       //llama al service
        res.status(200).json(
            authors
        ); //devuelve los autores en json
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

    //crea un nuevo autor 
    export const createAuthor = async (req, res) => {
        try {
            const author = await AuthorService.createAuthor(req.body);
            res.status(200).json({
            author
            }); //devuelve el autor creado
        } catch (err) {
            res.status(400).json({
            msg: err.toString()
            });
        }
    }   

    //actualiza un autor existente segun Id de la ruta
    export const updateAuthor = async (req, res) => {
        const authorId = req.params.id; //id del autor a actualizar
        try {
            await AuthorService.updateAuthor(authorId, req.body);
            res.status(200).json(1); //respuesta simple
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

    //elimina un autor por su ID
    export const deleteAuthor = async (req, res) => {
        const authorId = req.params.id;
        try {
            const deletedAuthor = await AuthorService.deleteAuthor(authorId);
            res.status(200).json({
                author: deletedAuthor
            });
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

    //paginado recibe en el body y devuelve datos
    export const getAuthorsPageable = async (req, res) => {
        const page = req.body.pageable.pageNumber || 0;
        const limit = req.body.pageable.pageSize || 5;
        const sort = req.body.pageable.sort || null;

        try {
            const response = await AuthorService.getAuthorsPageable(page, limit, sort);
            //mapeamos la respuesta para que coincida con la estructura del front
            res.status(200).json({
                content: response.docs, //autores de la pagina actual
                pageable: {
                    pageNumber: response.page - 1,
                    pageSize: response.limit
                },
                totalElements: response.totalDocs
            });
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }
