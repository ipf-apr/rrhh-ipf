const { validationResult } = require("express-validator")


const validateSchema = (schema) => {
  return async (req, res, next) => {
    // Se aplica las validaciones del esquema proporcionado
    await Promise.all(schema.map(validation => validation.run(req)));

    // Se obtiene los resultados de la validación
    const errors = validationResult(req);

    // Si hay errores, envía una respuesta con los errores
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Si no hay errores, pasa al siguiente middleware 
    next();
  };
};





module.exports = validateSchema