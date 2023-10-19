const express = require('express');
const router = express.Router();
const { index, store} = require("../controllers/employee.skills.controller");




//APIS SKILLS

router.get('/api/employee/:employeeId/skills', index);
router.post('/api/employee/:employeeId/skills/:skillId/store', store);

module.exports = router;