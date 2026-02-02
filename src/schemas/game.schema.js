//define la forma que tendran los documentos de game y crea el objeto

import mongoose from "mongoose";
const { Schema, model } = mongoose;
import normalize from 'normalize-mongoose';

//define el esquema para game
const gameSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minlength:1,
        maxlength:150,
    },
    age: {
        type: Number,
        required: true,
        //franja de edades permitidas
        max: 99,
        min: 0
    },
    category: {
        //referencia a otra coleccion (category)
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    author: {
        //referencia a otra coleccion (autor)
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    }
});
//aplica el plugin para normalizar la salida
gameSchema.plugin(normalize);

//crea el modelo y lo exporta 
const GameModel = model('Game', gameSchema);

export default GameModel;
