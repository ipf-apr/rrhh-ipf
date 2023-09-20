const {Router} = require('express');
const {   findAll,
    findOne,
    createSkill,
    skillUpdate,
    deleteSkill} = require ('../controllers/skills.controler');
const {body} = require ('express-validator');
const validateSchema = require('../middleware/validations');
const validatorSkills = require('../middleware/validatorSkills');

const router = Router();

//APIS

router.get('/api/skills',findAll);
router.get('/api/skill/:id',findOne);
router.post('/api/skill/create',validatorSkills,createSkill);
router.put('/api/skill/update/:id',validatorSkills,skillUpdate);
router.delete('/api/skill/delete/:id',deleteSkill);


module.exports = router;