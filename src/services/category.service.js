//este archivo implementa la capa de servicio para category

import CategoryModel from '../schemas/category.schema.js';
import { getGame } from './game.service.js';

//crea una categoria nueva con el nombre recibido
export const createCategory = async function(name) {
    try {
        return await category.save(); //lo guarda en la bd
    } catch (e) {
        throw Error('Error creating category');
    }
}

//devuelve todas las categorias ordenadas alfabeticamente
export const getCategories = async function () {
    try {
        return await CategoryModel.find().sort('name');
    } catch (e) {
        throw Error('Error fetching categories');
    }
}
//actualiza las categorias
export const updateCategory = async (id, name) => {
    try {
        //verifica si existe
        const category = await CategoryModel.findById(id);
        if (!category) {
            throw Error('There is no category with that Id');
        }    
        return await CategoryModel.findByIdAndUpdate(id, {name});
    } catch (e) {
        throw Error(e);
    }
}
//elimina la categoria
export const deleteCategory = async (id) => {
    try {
        //comprueba si hay juegos relacionados con la categoria
        const category = await CategoryModel.findById(id);
        if (!category) {
            throw 'There is no category with that Id';
        }
        const games = await getGame({category});
        if(games.length > 0) {
            throw 'There are games related to this category';
        }
        return await CategoryModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error(e);
    }
}
//obtiene categoria
export const getCategory = async (id) => {
    try {
        return await CategoryModel.findById(id);
    } catch (e) {
        throw Error('There is no category with that Id');
    }
}
