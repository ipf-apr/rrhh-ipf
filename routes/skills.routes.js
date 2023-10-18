<<<<<<< HEAD
const {Router} = require('express');
const {   findAll,
    findOne,
    createSkill,
    skillUpdate,
    deleteSkill} = require ('../controllers/skills.controler');
const {body} = require ('express-validator');
=======
const { Router } = require('express');


const skillController = require('../controllers/skills.controller');
const skillSchema = require('../models/schemas/skill.schema')
>>>>>>> main
const validateSchema = require('../middleware/validations');
const validatorSkills = require('../middleware/validatorSkills');

const router = Router();


//VISTAS
router.get("/skills", skillController.indexView);


//APIS

<<<<<<< HEAD
router.get('/api/skills',findAll);
router.get('/api/skill/:id',findOne);
router.post('/api/skill/create',validatorSkills,createSkill);
router.put('/api/skill/update/:id',validatorSkills,skillUpdate);
router.delete('/api/skill/delete/:id',deleteSkill);
=======
router.get('/api/skills', skillController.findAll);
router.post('/api/skills', validateSchema(skillSchema), skillController.createSkill);
router.get('/api/skills/:skillId', skillController.findOne);
router.put('/api/skills/:skillId/update', validateSchema(skillSchema), skillController.skillUpdate);
router.delete('/api/skills/:skillId/destroy', skillController.deleteSkill);
>>>>>>> main


module.exports = router;