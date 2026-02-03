
//este archvio define como se guarda y se devuelve un autor en la base de datos
import mongoose from "mongoose";
import normalize from 'normalize-mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

//define la estructura de los documentos autor en la bd
const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true, //quita espacios
    },
    nationality: {
        type: String,
        required: true,
        trim:true,

    }
});

//plugins del schema:
//normaliza la salida
authorSchema.plugin(normalize);
//añade paginacion
authorSchema.plugin(mongoosePaginate);
//crea el modelo a partir del schema y lo exporta
const AuthorModel = model('Author', authorSchema);
export default AuthorModel;
