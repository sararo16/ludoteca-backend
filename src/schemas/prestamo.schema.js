import mongoose from 'mongoose';

const prestamoSchema = new mongoose.Schema({
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

const Prestamo = mongoose.model('Prestamo', prestamoSchema);
export default Prestamo;