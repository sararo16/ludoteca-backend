//este archivo implementa la capa de servicio para category

import CategoryModel from '../schemas/category.schema.js';
import { getGame } from './game.service.js';

//crea una categoria nueva con el nombre recibido
export const createCategory = async function(name) {
    
 try {
    const clean = (name ?? '').trim();
    if (!clean) {
      throw new Error('El nombre es obligatorio');
    }

// Verificar duplicado 
    const exists = await CategoryModel.findOne({
      name: { $regex: `^${clean}$`, $options: 'i' }
    });
    if (exists) {
      const err = new Error('La categoría ya existe');
      err.code = 'CATEGORY_DUP';
      throw err;
    }

 const category = new CategoryModel({ name: clean });
    return await category.save();
  } catch (e) {
    
    throw e;
  }
};


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
