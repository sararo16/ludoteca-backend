
//este archivo gestiona todas las operaciones relacionadas con categorias

import * as CategoryService from '../services/category.service.js';

    //Crea una nueva categoria
    export const createCategory = async (req, res) => {


        const { name } = req.body;
        try {
            //llama al servicio que crea la categoria en bd
            const category = await CategoryService.createCategory(name);
            res.status(200).json({
                category
            }); //devolvemos la categoria creada
        } catch (err) {
            //error controlado, devolvemos mensaje del back
            res.status(400).json({
                msg: err.toString()
            });
        }
    }   
    
    //devuelve la lista completa de categorias
    export const getCategories = async (req, res) => {
    try {
            const categories = await CategoryService.getCategories();
            res.status(200).json(
                categories
            ); //responde con el array completo
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

    //actualiza una categoria por su id
    export const updateCategory = async (req, res) => {
        const categoryId = req.params.id;
        const { name } = req.body; //nuevo nombre
        try {
            await CategoryService.updateCategory(categoryId, name);
            res.status(200).json(1);
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

    //elimina categorias
    export const deleteCategory = async (req, res) => {
        const categoryId = req.params.id;
        try {
            const deletedCategory = await CategoryService.deleteCategory(categoryId);
            res.status(200).json({
                category: deletedCategory
            });
        } catch (err) {
            res.status(400).json({
                msg: err.toString()
            });
        }
    }

