
//este archivo recoge los errores de validacion 
import { response } from 'express';
import { validationResult } from 'express-validator';

//middleware que valida los resultados, si hay errores
//responde si no continua
const validateFields = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.mapped()
        });
    }
    next();
}

export default validateFields;
