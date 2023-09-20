const {check} = require('express-validator');
const validateSchema = require('./validations');

const validatorSkills = [
    check('nameSkill')
    .exists()
    .notEmpty().withMessage('El nombre de la habilidad es obligatorio!'),

    (req,res,next) => {
        validateSchema(req,res,next)
    }   
] 



module.exports = validatorSkills;