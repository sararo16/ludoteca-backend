import Prestamo from '../schemas/prestamo.schema.js';

export const getPrestamo = async (req, res) => {
try {
const { gameId, clientId, date, pageNumber, pageSize } = req.query;

let query = {};
if (gameId) query.game = gameId;
if (clientId) query.client = clientId;
if (date) {
const searchDate = new Date(date);
query.startDate = { $lte: searchDate };
query.endDate = { $gte: searchDate };
}

const page = parseInt(pageNumber) || 0;
const limit = parseInt(pageSize) || 5;
const skip = page * limit;

const [prestamos, total] = await Promise.all([
Prestamo.find(query)
.populate('game')
.populate('client')
.skip(skip)
.limit(limit),
Prestamo.countDocuments(query)
]);

res.json({
content: prestamos,
totalElements: total
});

} catch (error) {
console.error("Error en getPrestamo:", error);
res.status(500).json({ message: "Error interno del servidor" });
}
};

export const createPrestamo = async (req, res) => {
try {
const newPrestamo = new Prestamo(req.body);
await newPrestamo.save();
res.json(newPrestamo);
} catch (error) {
res.status(500).json({ message: "Error al crear préstamo" });
}
};

export const updatePrestamo = async (req, res) => {
try {
const { id } = req.params;
const updatedPrestamo = await Prestamo.findByIdAndUpdate(id, req.body, { new: true });
res.json(updatedPrestamo);
} catch (error) {
res.status(500).json({ message: "Error al actualizar préstamo" });
}
};

export const deletePrestamo = async (req, res) => {
try {
const { id } = req.params;
await Prestamo.findByIdAndDelete(id);
res.json({ message: 'Prestamo eliminado' });
} catch (error) {
res.status(500).json({ message: "Error al borrar préstamo" });
}
};
