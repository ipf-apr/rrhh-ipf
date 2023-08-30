const { Router } = require('express')

const router = Router();

const authController = require('../controllers/auth.controllers');



router.get('/login', authController.loginPage)

router.post('/api/register',authController.register);


router.post('/api/login',authController.login);
router.post('/logout',authController.logout);

module.exports = router;