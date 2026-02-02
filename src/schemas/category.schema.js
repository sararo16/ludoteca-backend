
//define como se guardan las categorias en la bd
import mongoose from "mongoose";
const { Schema, model } = mongoose;
import normalize from 'normalize-mongoose';

//se define 
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    }
});
//limpia y normaliza el JSON 
categorySchema.plugin(normalize);
//crea el modelo a partir del schema y lo exporta 
const CategoryModel = model('Category', categorySchema);
export default CategoryModel;
