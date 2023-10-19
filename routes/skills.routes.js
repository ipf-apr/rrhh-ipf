const { Router } = require('express');


const skillController = require('../controllers/skills.controller');
const skillSchema = require('../models/schemas/skill.schema')
const validateSchema = require('../middlewares/validations');

const router = Router();


//VISTAS
router.get("/skills", skillController.indexView);


//APIS

router.get('/api/skills', skillController.findAll);
router.post('/api/skills', validateSchema(skillSchema), skillController.createSkill);
router.get('/api/skills/:skillId', skillController.findOne);
router.put('/api/skills/:skillId/update', validateSchema(skillSchema), skillController.skillUpdate);
router.delete('/api/skills/:skillId/destroy', skillController.deleteSkill);


module.exports = router;