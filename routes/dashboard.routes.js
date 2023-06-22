const { Router } = require('express')

const router = Router();

const dashboardController = require('../controllers/dashboard.controllers');



router.get('/', dashboardController.index)


module.exports = router;