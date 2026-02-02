//Este archivo define los controladores HTTP de Prestamo

import Prestamo from '../schemas/prestamo.schema.js';

//lista prestamos con filtros opcionales y paginacion
export const getPrestamo = async (req, res) => {
try {
    //se leen los filtros desde la query
const { gameId, clientId, date, pageNumber, pageSize } = req.query;

let query = {};
if (gameId) query.game = gameId;
if (clientId) query.client = clientId;
//si llefa date buscamos prestamos activos desde ese dia
if (date) {
const searchDate = new Date(date);
query.startDate = { $lte: searchDate };
query.endDate = { $gte: searchDate };
}
//paginacion:base , limit y calculo de skip
const page = parseInt(pageNumber) || 0;
const limit = parseInt(pageSize) || 5;
const skip = page * limit;
//se ejecuta en paralelo la busqueda paginada, el conteo total para la paginacion
const [prestamos, total] = await Promise.all([
Prestamo.find(query)
.populate('game')
.populate('client')
.skip(skip)
.limit(limit),
Prestamo.countDocuments(query)
]);
//se responde con el contenido y el total
res.json({
content: prestamos,
totalElements: total
});

} catch (error) {
console.error("Error en getPrestamo:", error);
res.status(500).json({ message: "Error interno del servidor" });
}
};
//crea un prestamo
export const createPrestamo = async (req, res) => {
try {
const newPrestamo = new Prestamo(req.body);
await newPrestamo.save();
res.json(newPrestamo);
} catch (error) {
res.status(500).json({ message: "Error al crear préstamo" });
}
};
//actualiza un prestamo existente por su ID 
export const updatePrestamo = async (req, res) => {
try {
const { id } = req.params;
const updatedPrestamo = await Prestamo.findByIdAndUpdate(
    id, 
    req.body, { new: true }//devuelve el documento creado
);
res.json(updatedPrestamo);
} catch (error) {
res.status(500).json({ message: "Error al actualizar préstamo" });
}
};

//elimina un prestamo por su id
export const deletePrestamo = async (req, res) => {
try {
const { id } = req.params;
await Prestamo.findByIdAndDelete(id);
res.json({ message: 'Prestamo eliminado' });
} catch (error) {
res.status(500).json({ message: "Error al borrar préstamo" });
}
};
