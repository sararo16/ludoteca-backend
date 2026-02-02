//define la forma que tendran los documentos de prestamo y crea el objeto

import mongoose from 'mongoose';
//definicion del esquema 
const prestamoSchema = new mongoose.Schema({
    //referencia al juego que se esta prestando
    game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
    },
    client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
    },
    startDate: {
    type: Date,
    required: true
    },
    endDate: {
    type: Date,
    required: true
    }
    });
//crea el modelo prestamo y lo exporta
const Prestamo = mongoose.model('Prestamo', prestamoSchema);
export default Prestamo;