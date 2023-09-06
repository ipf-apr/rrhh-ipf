const {Router} = require('express');

const {   findAll,
    findOne,
    createSkill,
    skillUpdate,
    deleteSkill} = require ('../controllers/skills.controler');

const router = Router();

//APIS

router.get('/api/skill',findAll);
router.get('/api/skill/:id',findOne);
router.post('/api/skill/create',createSkill);
router.put('/api/skill/update/:id',skillUpdate);
router.delete('/api/skill/delete/:id',deleteSkill);


module.exports = router;