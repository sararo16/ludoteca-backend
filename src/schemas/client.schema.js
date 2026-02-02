
//define la forma que tendran los documentos de cliente y crea el objeto

import mongoose from "mongoose"; 
const { Schema, model } = mongoose;
import normalize from 'normalize-mongoose';

//define el esquema de la coleccion clients, solo campo nombre
const clientSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
});
//crea y exporta el modelo 
export default mongoose.model('Client',clientSchema);