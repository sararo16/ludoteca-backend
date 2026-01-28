import mongoose from "mongoose"; 
const { Schema, model } = mongoose;
import normalize from 'normalize-mongoose';

const clientSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    }
});

export default mongoose.model('Client',clientSchema);