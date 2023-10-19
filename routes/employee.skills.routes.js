const express = require('express');
const router = express.Router();
const { index, store} = require("../controllers/employee.skills.controller");




//APIS SKILLS

router.get('/employee/:employeeId/skills', index);
router.post('/employee/:employeeId/skills/:skillId/store', store);

module.export = router;