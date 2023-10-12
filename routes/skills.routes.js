const {Router} = require('express');


const {   indexView, findAll,
    findOne,
    createSkill,
    skillUpdate,
    deleteSkill} = require ('../controllers/skills.controler');
const {body} = require ('express-validator');
const validateSchema = require('../middleware/validations');

const router = Router();


//VISTAS
router.get("/skills", indexView);


//APIS

router.get('/api/skills',findAll);
router.post('/api/skills',validateSchema([
    body('nameSkill').notEmpty().withMessage('El nombre de la habilidad es obligatorio'),
]),createSkill);
router.get('/api/skills/:skillId',findOne);
router.put('/api/skills/:skillId/update',skillUpdate);
router.delete('/api/skills/:skillId/destroy',deleteSkill);


module.exports = router;