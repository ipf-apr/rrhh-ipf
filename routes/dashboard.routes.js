const { Router } = require('express')

const router = Router();

const dashboardController = require('../controllers/dashboard.controller');



router.get('/dashboard', dashboardController.index)


module.exports = router;