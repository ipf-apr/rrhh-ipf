const { validationResult } = require("express-validator")


const validateSchema = (req,res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const errorMenssages = errors.array().map(error =>error.msg);
        return res.status(400).json({errors:errorMenssages});
    }
    next();
};
module.exports = validateSchema